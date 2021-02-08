const util = require("./util");

class APIFeatures {
  constructor (query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter(type) {
    // elimino tutti i campi che non riguardano il filter
    let toExclude = ['page', 'sort', 'limit', 'fields'];
    const queryObj = util.excludeFields({ ...this.queryString }, toExclude);

    // campi riguardanti l'annuncio specifico
    toExclude = ['user_id', 'title', 'typeAnnouncement'];
    let specificFields = util.excludeFields(queryObj, toExclude);

    // campi riguardanti l'annuncio generico
    toExclude = Object.keys(specificFields);
    const genericFields = util.excludeFields(queryObj, toExclude);

    let queryStr;
    if(type === 'generic') queryStr = JSON.stringify(genericFields);
    else queryStr = JSON.stringify(specificFields); 

    // applico il filtro
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));
  
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.replace(',',' ');
      this.query = this.query.sort(sortBy);
    } 
    // else {
    //   this.query = this.query.sort('-createdAt');
    // }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.replace(',',' ');
      this.query = this.query.select(fields);
    } else {
      // FIXME: togliere il __v sull'annuncio specifico
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}
module.exports = APIFeatures;