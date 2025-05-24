export const projection = {
    _id: 1,
    id: 1,
    name: 1,
    roomType: 1,
    description: 1,
    images: 1,
    pricePerNight: 1,
    roomSize: 1,
    bedInfo: 1,
    maxGuests: 1,
    maxAdults: 1,
    maxChildren: 1,
    hasBalcony: 1,
    bathroomType: 1,
    isSmokingAllowed: 1,
    hasClimateControl: 1,
    housekeepingFrequency: 1,
    availability: 1,
    rating: 1,
    tags: 1,
    amenities: 1,
    createdAt: 1,
}

export const mongoSearchPipeline = ({ query, skip, limit }) => {
    const searchPipeline = [
        {
            $match: {
                $or: [
                    { name: { $regex: query, $options: 'i' } },
                    { description: { $regex: query, $options: 'i' } },
                    { roomType: { $regex: query, $options: 'i' } },
                    { amenities: { $regex: query, $options: 'i' } },
                    { tags: { $regex: query, $options: 'i' } },
                    { bathroomType: { $regex: query, $options: 'i' } },
                    { housekeepingFrequency: { $regex: query, $options: 'i' } },
                    { roomSize: { $regex: query, $options: 'i' } },
                    { id: { $regex: query, $options: 'i' } },
                    { 'bedInfo.types.type': { $regex: query, $options: 'i' } },
                    { pricePerNight: { $eq: isNaN(Number(query)) ? null : Number(query) } },
                    { maxGuests: { $eq: isNaN(Number(query)) ? null : Number(query) } },
                    { maxAdults: { $eq: isNaN(Number(query)) ? null : Number(query) } },
                    { maxChildren: { $eq: isNaN(Number(query)) ? null : Number(query) } },
                    { rating: { $eq: isNaN(Number(query)) ? null : Number(query) } },
                ],
            },
        },
        {
            $project: projection,
        },
        {
            $skip: skip,
        },
        {
            $limit: limit,
        },
    ];

    return searchPipeline;
};