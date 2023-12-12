import { SortOrder } from 'mongoose'
import neighborhoodSchema from '../../db/models/neighborhood'

// db-controllers will be in this file in order to seperate functionality and be able to maintain, test and use the controllers across the server.
export const getNeighborhoodsByParams = async (filters: { [key: string]: { [key: string]: number } }, sort: { [key: string]: SortOrder }) => {
    try {
        console.log("filters", filters)
        const x = await neighborhoodSchema.find(filters).sort(sort)
        console.log("bla", x)
        return x
    } catch (e) {
        throw new Error(`error while tring to find neiborhood, ${e}`)
    }

}