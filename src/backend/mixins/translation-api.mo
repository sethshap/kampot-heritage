import List "mo:core/List";
import TranslationLib "../lib/translation";
import TranslationTypes "../types/translation";

mixin (translations : List.List<TranslationTypes.Translation>) {
  public func getTranslations() : async [TranslationTypes.Translation] {
    TranslationLib.getAll(translations);
  };

  public func getTranslationByKey(key : Text) : async ?TranslationTypes.Translation {
    TranslationLib.getByKey(translations, key);
  };
};
