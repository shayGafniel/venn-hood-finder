import express, { Request, Response } from 'express'
import { getNeighborhoodsByParams } from '../../db/controllers/neighborhoodsController'
import { parseRangeFilter, parseSortFilter } from '../../utils/utils'
import { SortOrder } from 'mongoose'
import { validateGetNeighborhoodsQueryParams } from '../../middleware/validation/validations'


const router = express.Router()

/**
 * @swagger
 * /neighborhood/:
 *   get:
 *     summary: Retrieve neighborhoods based on specified filters.
 *     description: |
 *       Retrieves neighborhoods based on optional query parameters:
 *       - `ageRange`: Retrieves neighborhoods based on average age range.
 *       - `maxDistance`: Retrieves neighborhoods within a specified distance from the city center.
 *       - `sortBy`: Sorts neighborhoods based on specified fields and order.
 *     parameters:
 *       - in: query
 *         name: ageRange
 *         schema:
 *           type: string
 *         description: Filter neighborhoods by average age range (e.g., 'gte:20,lte:50').
 *       - in: query
 *         name: maxDistance
 *         schema:
 *           type: number
 *         description: Filter neighborhoods by maximum distance from the city center.
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Sort neighborhoods by specified field and order (e.g., 'averageIncome,desc').
 *     responses:
 *       '200':
 *         description: A list of neighborhoods based on specified filters.
 */
router.get('/', validateGetNeighborhoodsQueryParams, async (req: Request, res: Response) => {
  try {
    const { ageRange, maxDistance, sortBy } = req.query
    let filters: { [key: string]: { [key: string]: number } } = {}
    let sort: { [key: string]: SortOrder } = {}
    if (ageRange) {
      filters = { ...parseRangeFilter("average age", ageRange as string) }
    }

    if (maxDistance) {
      filters['distance from city center'] = { '$lte': parseInt(maxDistance as string, 10) }
    }

    if (sortBy) {
      sort = parseSortFilter(sortBy as string)
    }

    res.status(200).send(await getNeighborhoodsByParams(filters, sort))
  } catch (e) {
    console.log("error while fetching", e)
    res.status(500).send("OOPS SOMETHING WENT WRONG")
  }

})

export { router as neighborhoodsRouter }