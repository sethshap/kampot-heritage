import { createActor } from "@/backend";
import { t as tStandalone, useLanguage } from "@/lib/i18n";
import type { Translation } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

export function useTranslations() {
  const { actor, isFetching } = useActor(createActor);
  const { lang } = useLanguage();

  const query = useQuery<Translation[]>({
    queryKey: ["translations"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTranslations();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 10, // 10 min — translations rarely change
  });

  const tFn = (key: string): string => {
    if (!query.data) return key;
    return tStandalone(key, query.data, lang);
  };

  return {
    translations: query.data ?? [],
    t: tFn,
    isLoading: query.isLoading,
  };
}
