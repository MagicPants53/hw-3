export type ApiConfig = {
  populate: string[];
  pagination: {
    page: number | string;
    pageSize: number | string;
  };
  filters?: {
    title?: { $containsi: string };
    productCategory?: {
      id: { $in: string | number[] };
    };
  };
};
