import { useState } from 'react'
import { ChevronDown, ChevronUp, MapPin, Utensils, Hotel, Car, Clock } from 'lucide-react'

const ItineraryTimeline = ({ itinerary }) => {
  const [expandedDays, setExpandedDays] = useState({})

  const toggleDay = (dayNumber) => {
    setExpandedDays((prev) => ({
      ...prev,
      [dayNumber]: !prev[dayNumber],
    }))
  }

  if (!itinerary || itinerary.length === 0) {
    return null
  }

  return (
    <div className="relative">
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-primary/20" />

      <div className="space-y-6">
        {itinerary.map((day) => {
          const isExpanded = expandedDays[day.dayNumber || day.day]

          return (
            <div key={day.dayNumber || day.day} className="relative pl-16">
              <div className="absolute left-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg z-10">
                {day.dayNumber || day.day}
              </div>

              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleDay(day.dayNumber || day.day)}
                  className="w-full p-5 flex items-center justify-between text-left hover:bg-warmWhite transition-colors"
                >
                  <div>
                    <h3 className="font-display text-lg font-bold text-charcoal">
                      Day {day.dayNumber || day.day}: {day.title}
                    </h3>
                    {day.locations && (
                      <div className="flex items-center text-muted text-sm mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        {Array.isArray(day.locations) ? day.locations.join(', ') : day.locations}
                      </div>
                    )}
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-muted shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted shrink-0" />
                  )}
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                  } overflow-hidden`}
                >
                  <div className="px-5 pb-5 border-t border-gray-100">
                    {day.description && (
                      <p className="text-muted mt-4 mb-4 leading-relaxed">{day.description}</p>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      {day.activities && day.activities.length > 0 && (
                        <div>
                          <h4 className="font-medium text-charcoal text-sm mb-2">Activities</h4>
                          <ul className="space-y-1">
                            {day.activities.map((activity, i) => (
                              <li key={i} className="text-sm text-muted flex items-start">
                                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 mr-2 shrink-0" />
                                {activity}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {day.meals && (
                        <div className="flex items-start">
                          <Utensils className="w-4 h-4 text-secondary mt-0.5 mr-2 shrink-0" />
                          <div>
                            <span className="font-medium text-charcoal text-sm">Meals</span>
                            <p className="text-sm text-muted">
                              {typeof day.meals === 'string'
                                ? day.meals
                                : [
                                    day.meals.breakfast && 'Breakfast',
                                    day.meals.lunch && 'Lunch',
                                    day.meals.dinner && 'Dinner',
                                  ].filter(Boolean).join(', ') || 'N/A'}
                            </p>
                          </div>
                        </div>
                      )}

                      {(day.hotel || day.overnightAt) && (
                        <div className="flex items-start">
                          <Hotel className="w-4 h-4 text-secondary mt-0.5 mr-2 shrink-0" />
                          <div>
                            <span className="font-medium text-charcoal text-sm">Accommodation</span>
                            <p className="text-sm text-muted">{day.hotel || day.overnightAt}</p>
                          </div>
                        </div>
                      )}

                      {day.distance && (
                        <div className="flex items-start">
                          <Car className="w-4 h-4 text-secondary mt-0.5 mr-2 shrink-0" />
                          <div>
                            <span className="font-medium text-charcoal text-sm">Distance</span>
                            <p className="text-sm text-muted">{day.distance}</p>
                          </div>
                        </div>
                      )}

                      {day.travelTime && (
                        <div className="flex items-start">
                          <Clock className="w-4 h-4 text-secondary mt-0.5 mr-2 shrink-0" />
                          <div>
                            <span className="font-medium text-charcoal text-sm">Travel Time</span>
                            <p className="text-sm text-muted">{day.travelTime}</p>
                          </div>
                        </div>
                      )}

                      {day.altitude && (
                        <div className="flex items-start">
                          <MapPin className="w-4 h-4 text-secondary mt-0.5 mr-2 shrink-0" />
                          <div>
                            <span className="font-medium text-charcoal text-sm">Altitude</span>
                            <p className="text-sm text-muted">{day.altitude}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ItineraryTimeline
