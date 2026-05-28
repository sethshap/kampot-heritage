import List "mo:core/List";
import TranslationTypes "../types/translation";

module {
  public type Translation = TranslationTypes.Translation;

  public func getAll(translations : List.List<Translation>) : [Translation] {
    translations.toArray();
  };

  public func getByKey(translations : List.List<Translation>, key : Text) : ?Translation {
    translations.find(func(t) { t.key == key });
  };
};
