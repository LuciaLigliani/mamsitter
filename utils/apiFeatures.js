const util = require("./util");

class APIFeatures {
  constructor (query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter(type) {
    // elimino tutti i campi che non riguardano il filter
    let toExclude = ['page', 'sort', 'limit', 'fields', 'neededDays', 'availableDays', 'numberChildren', 'numberSeniors'];
    const queryObj = util.excludeFields({ ...this.queryString }, toExclude);

    // campi riguardanti l'annuncio specifico
    toExclude = ['user_id', 'title', 'typeAnnouncement', 'role'];
    const specificFields = util.excludeFields(queryObj, toExclude);

    // campi riguardanti l'annuncio generico
    toExclude = Object.keys(specificFields);
    const genericFields = util.excludeFields(queryObj, toExclude);

    let queryStr;
    if(type === 'generic') queryStr = JSON.stringify(genericFields);
    else queryStr = JSON.stringify(specificFields); 

    // applico il filtro
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt|ne)\b/g, match => `$${match}`);
    queryStr = JSON.parse(queryStr);

    this.query = this.query.find(queryStr);
  
    return this;
  }

  moreFilters() {
    if(this.queryString.neededDays) {
      const queryStr = this.queryString.neededDays.split(',');
      let day;
      // eslint-disable-next-line no-plusplus
      for(let i = 0; i < queryStr.length; i++){
        day = queryStr[i].split('-');
        this.query = this.query.find({'neededDays.weekDay': day[0], 'neededDays.partOfDay': day[1]});
      }
    }
    else if(this.queryString.availableDays) {
      const queryStr = this.queryString.availableDays.split(',');
      let day;
      // eslint-disable-next-line no-plusplus
      for(let i = 0; i < queryStr.length; i++){
        day = queryStr[i].split('-');
        this.query = this.query.find({'availableDays.weekDay': day[0], 'availableDays.partOfDay': day[1]});
      }
    }
    else if(this.queryString.numberChildren) {
      const number = Number(this.queryString.numberChildren);
      this.query = this.query.find({'children': {$size: number}});
    }
    else if(this.queryString.numberSeniors) {
      const number = Number(this.queryString.numberSeniors);
      this.query = this.query.find({'seniors': {$size: number}});
    }
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