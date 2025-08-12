"use client";
import React, { useState, useEffect } from "react";

// Mock data based on Prisma schema
const mockLocations = [
  {
    id: 1,
    name: "Embassy Garden",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  { id: 2, name: "Gallery", createdAt: new Date(), updatedAt: new Date() },
  { id: 3, name: "Pavilion", createdAt: new Date(), updatedAt: new Date() },
];

const mockRooms = [
  {
    id: 1,
    name: "D00`",
    locationId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: "D01`",
    locationId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    name: "D02`",
    locationId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    name: "D03`",
    locationId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    name: "D04`",
    locationId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 6,
    name: "A003",
    locationId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const mockItems = [
  {
    id: 1,
    name: "Projector",
    roomId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: "Whiteboard",
    roomId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    name: "Conference Chairs",
    roomId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    name: "Reception Desk",
    roomId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    name: "Visitor Chairs",
    roomId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 6,
    name: "Coffee Table",
    roomId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 7,
    name: "Desk",
    roomId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 8,
    name: "Executive Chair",
    roomId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 9,
    name: "Bookshelf",
    roomId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 10,
    name: "Projector Screen",
    roomId: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 11,
    name: "Training Tables",
    roomId: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 12,
    name: "Storage Shelves",
    roomId: 6,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Types matching Prisma schema
type Location = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

type Room = {
  id: number;
  name: string;
  locationId: number;
  createdAt: Date;
  updatedAt: Date;
};

type Item = {
  id: number;
  name: string;
  roomId: number;
  createdAt: Date;
  updatedAt: Date;
};

type Check = {
  itemId: number;
  isPresent: boolean;
};

export default function Checklist() {
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [checks, setChecks] = useState<Record<number, Check>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Filter rooms based on selected location
  const filteredRooms = selectedLocation
    ? mockRooms.filter((room) => room.locationId === selectedLocation)
    : [];

  // Filter items based on selected room
  const filteredItems = selectedRoom
    ? mockItems.filter((item) => item.roomId === selectedRoom)
    : [];

  // Initialize checks when room changes
  useEffect(() => {
    if (selectedRoom) {
      const initialChecks: Record<number, Check> = {};
      filteredItems.forEach((item) => {
        // Preserve existing check if it exists, otherwise default to true
        initialChecks[item.id] = checks[item.id] || {
          itemId: item.id,
          isPresent: true,
        };
      });
      setChecks(initialChecks);
      setIsSubmitted(false);
    }
  }, [selectedRoom, filteredItems]);

  const handleCheckChange = (itemId: number) => {
    setChecks((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        isPresent: !prev[itemId]?.isPresent,
      },
    }));
  };

  const handleSubmit = () => {
    if (isSubmitting || isSubmitted) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Submitting checks:", checks);
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset after 2 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 2000);
    }, 800);
  };

  const getCheckStatus = (itemId: number) => {
    return checks[itemId]?.isPresent ?? true;
  };

  const getMissingItemsCount = () => {
    return Object.values(checks).filter((check) => !check.isPresent).length;
  };

  const getSelectedLocationName = () => {
    return (
      mockLocations.find((l) => l.id === selectedLocation)?.name ||
      "No location selected"
    );
  };

  const getSelectedRoomName = () => {
    return (
      mockRooms.find((r) => r.id === selectedRoom)?.name || "No room selected"
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-amber-50 px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 text-center">
          <h1 className="mb-2 text-4xl font-bold text-[#4D0F28]">
            Asset Checklist
          </h1>
          <p className="text-lg text-rose-800/80">
            Track and verify assets across your locations
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
          <div className="md:flex">
            {/* Left Panel - Selection */}
            <div className="bg-gradient-to-b from-[#4D0F28] to-[#3A0A1F] p-6 text-white md:w-1/3">
              <h2 className="mb-6 text-xl font-bold">Select Location & Room</h2>

              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium">
                  Location
                </label>
                <select
                  value={selectedLocation || ""}
                  onChange={(e) => {
                    setSelectedLocation(Number(e.target.value));
                    setSelectedRoom(null);
                  }}
                  className="w-full rounded-lg border border-rose-700 bg-rose-900/30 p-3 focus:ring-2 focus:ring-rose-400 focus:outline-none"
                >
                  <option value="" disabled>
                    Select a location
                  </option>
                  {mockLocations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.name}
                    </option>
                  ))}
                </select>
              </div>

              {selectedLocation && (
                <div className="mb-6">
                  <label className="mb-2 block text-sm font-medium">Room</label>
                  <select
                    value={selectedRoom || ""}
                    onChange={(e) => setSelectedRoom(Number(e.target.value))}
                    className="w-full rounded-lg border border-rose-700 bg-rose-900/30 p-3 focus:ring-2 focus:ring-rose-400 focus:outline-none"
                  >
                    <option value="" disabled>
                      Select a room
                    </option>
                    {filteredRooms.map((room) => (
                      <option key={room.id} value={room.id}>
                        {room.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {selectedRoom && (
                <div className="mt-6 rounded-lg bg-rose-900/30 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-medium">Items to check:</span>
                    <span className="font-bold">{filteredItems.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Missing items:</span>
                    <span className="font-bold text-rose-300">
                      {getMissingItemsCount()}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Right Panel - Checklist */}
            <div className="p-6 md:w-2/3">
              {selectedRoom ? (
                <div>
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {getSelectedRoomName()}
                    </h2>
                    <div className="rounded-full bg-rose-100 px-3 py-1 text-sm font-medium text-rose-800">
                      {getSelectedLocationName()}
                    </div>
                  </div>

                  <div className="mb-6 rounded-lg border border-rose-200 bg-rose-50 p-4">
                    <div className="flex items-center text-rose-800">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2 h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Click each item that is present in the room</span>
                    </div>
                  </div>

                  <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                    {filteredItems.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleCheckChange(item.id)}
                        className={`flex cursor-pointer items-center rounded-xl border p-4 transition-all ${
                          getCheckStatus(item.id)
                            ? "border-gray-200 bg-white hover:border-rose-300 hover:bg-rose-50"
                            : "border-rose-200 bg-rose-50"
                        }`}
                      >
                        <div
                          className={`mr-4 flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                            getCheckStatus(item.id)
                              ? "border-[#4D0F28] bg-white"
                              : "border-rose-500"
                          }`}
                        >
                          {getCheckStatus(item.id) ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-[#4D0F28]"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-rose-500"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                        <span
                          className={`font-medium ${getCheckStatus(item.id) ? "text-gray-700" : "text-rose-700"}`}
                        >
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting || isSubmitted}
                      className={`flex items-center rounded-lg px-6 py-3 font-medium ${
                        isSubmitting || isSubmitted
                          ? "bg-emerald-600 text-white"
                          : "bg-[#4D0F28] text-white shadow-lg transition-all hover:bg-[#3A0A1F] hover:shadow-xl"
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="mr-3 -ml-1 h-5 w-5 animate-spin text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Processing...
                        </>
                      ) : isSubmitted ? (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="mr-2 h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Submitted Successfully!
                        </>
                      ) : (
                        "Submit Checklist"
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex h-full flex-col items-center justify-center py-20 text-center">
                  <div className="mb-6 inline-block rounded-full bg-rose-100 p-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16 text-[#4D0F28]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                      />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-2xl font-bold text-gray-800">
                    Select Location and Room
                  </h3>
                  <p className="max-w-md text-gray-600">
                    Choose a location and room from the left panel to view and
                    manage its asset checklist.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-600">
          <p>
            Asset Management System • {mockLocations.length} Locations •{" "}
            {mockRooms.length} Rooms • {mockItems.length} Items
          </p>
        </div>
      </div>
    </div>
  );
}
