import { SortOrder } from "mongoose";

// function for parsing the range params, right now only the 'avarage age' but able to add more range filter like max and min avarage income etc.
export const parseRangeFilter = (fieldName: string, value: string | string[]): { [key: string]: { [key: string]: number } } => {
    let filter: { [key: string]: { [key: string]: number } } = {}
    try {
        const paramRanges = Array.isArray(value) ? value : [value];

        paramRanges.forEach((param: string) => {
            const [operator, value] = param.split(':');
            if (operator === 'gte') {
                filter[fieldName] = { ...filter[fieldName], $gte: parseInt(value, 10) };
            } else if (operator === 'lte') {
                filter[fieldName] = { ...filter[fieldName], $lte: parseInt(value, 10) };
            }
        });
    } catch (e) {
        console.log(`error while parssing ${fieldName} filter`)
    } finally {
        return filter;
    }


}
// function for parsing the sore filter.
export const parseSortFilter = (sortValue: string): { [key: string]: SortOrder } => {
    const [field, order] = sortValue.split(',');
    return field && order ? { [field]: order === 'desc' ? -1 : 1 } : { ['id']: 1 }
}