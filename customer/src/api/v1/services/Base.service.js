BaseModel = null;

class BaseService {
  constructor(model) {
    this.BaseModel = model;
  }

  create(data) {
    const value = new this.BaseModel(data).save();
    if (!value) return false;
    return value;
  }
  list(where) {
    const value = this.BaseModel.find(where || {});
    if (!value) return false;
    return value;
  }
  listOne(where) {
    const value = this.BaseModel.findOne(where);
    if (!value) return false;
    return value;
  }
  update(where, data) {
    const value = this.BaseModel.findOneAndUpdate(where, data, { new: true });
    if (!value) return false;
    return value;
  }
  delete(where) {
    const value = this.BaseModel.findOneAndDelete(where);
    if (!value) return false;
    return value;
  }
}

module.exports = BaseService;
