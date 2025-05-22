                  {/* Star Rating */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-rose-500 uppercase tracking-wider font-sans ml-1">
                      Star Rating
                    </label>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map(rating => (
                        <button
                          key={`rating-${rating}`}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, rating }))}
                          className={`flex items-center justify-center w-10 h-10 rounded-full ${
                            formData.rating >= rating 
                              ? 'bg-amber-400 text-white' 
                              : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                          } transition-colors duration-300`}
                        >
                          <Star className="h-5 w-5" fill={formData.rating >= rating ? "currentColor" : "none"} />
                        </button>
                      ))}
                      {formData.rating > 0 && (
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, rating: 0 }))}
                          className="ml-2 text-xs text-gray-500 hover:text-rose-500"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  </div>