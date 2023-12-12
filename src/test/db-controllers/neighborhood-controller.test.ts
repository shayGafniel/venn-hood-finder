import { getNeighborhoodsByParams } from "../../db/controllers/neighborhoodsController";
import { mockNeighborhoods } from "../mock-data/neighborhoods";
import neighborhoodModel from '../../db/models/neighborhood'
import { SortOrder } from "mongoose";
import sinon from 'sinon';

describe('when data is valid getNeighborhoodsByParams', () => {
    it('Should return neighborhoods based on filters', async () => {
        const findStub = sinon.stub();
        const sortStub = sinon.stub();

        findStub.returns({
            sort: sortStub.returns(mockNeighborhoods)
        });

        sinon.stub(neighborhoodModel, 'find').callsFake(findStub);

        const filters = { 'average age': { $gte: 30, $lte: 30 } };
        const sort = { 'distance from city center': 1 as SortOrder };

        expect(await getNeighborhoodsByParams(filters, sort)).toEqual(mockNeighborhoods);
    });
});
