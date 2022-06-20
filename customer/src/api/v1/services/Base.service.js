let BaseModel = null;

class BaseService {
  constructor(model) {
    BaseModel = model;
  }

  create(data) {
    const value = new BaseModel(data).save();
    if (!value) return false;
    return value;
  }
  list(where) {
    const value = BaseModel?.find(where || {});
    if (!value) return false;
    return value;
  }
  listOne(where) {
    const value = BaseModel?.findOne(where);
    if (!value) return false;
    return value;
  }
  update(where, data) {
    const value = BaseModel?.findOneAndUpdate(where, data, { new: true });
    if (!value) return false;
    return value;
  }
  delete(where) {
    const value = BaseModel?.findOneAndDelete(where);
    if (!value) return false;
    return value;
  }
}

module.exports = BaseService;
