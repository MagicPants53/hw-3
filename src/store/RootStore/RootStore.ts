import QueryParamsStore from './QueryParamsStore';

export default class RootStore {
  readonly query = new QueryParamsStore();

  constructor() {
    this.query.setSearch(window.location.search);
  }
}
