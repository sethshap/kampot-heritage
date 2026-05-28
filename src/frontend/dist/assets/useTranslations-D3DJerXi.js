import { u as useActor, a as useQuery, c as createActor } from "./backend-BGqH3Hc2.js";
import { u as useLanguage, t } from "./index-DzwzmQd8.js";
function useTranslations() {
  const { actor, isFetching } = useActor(createActor);
  const { lang } = useLanguage();
  const query = useQuery({
    queryKey: ["translations"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTranslations();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1e3 * 60 * 10
    // 10 min — translations rarely change
  });
  const tFn = (key) => {
    if (!query.data) return key;
    return t(key, query.data, lang);
  };
  return {
    translations: query.data ?? [],
    t: tFn,
    isLoading: query.isLoading
  };
}
export {
  useTranslations as u
};
