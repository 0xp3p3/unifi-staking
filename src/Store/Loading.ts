import { atom, selector } from "recoil";

export const Loading = atom<{ loading: number; totalRequests: number }>({
  key: "loading",
  default: { loading: 0, totalRequests: 0 },
});

export const isLoading = selector({
  key: "is-loading",
  get: ({ get }) => {
    const { loading, totalRequests } = get(Loading);
    return loading !== totalRequests;
  },
});
