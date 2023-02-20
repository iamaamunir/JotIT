class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy).populate("owner", "name");
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }
  paginate() {
    const { page = 1, limit = 5 } = this.queryString;
    this.query = this.query
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate("owner", "name")
      .exec();

    return this;
  }
}

module.exports = APIFeatures;
