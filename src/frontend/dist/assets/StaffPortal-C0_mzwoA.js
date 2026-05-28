var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _client, _currentResult, _currentMutation, _mutateOptions, _MutationObserver_instances, updateResult_fn, notify_fn, _a;
import { e as Subscribable, s as shallowEqualObjects, h as hashKey, g as getDefaultState, n as notifyManager, i as useQueryClient, r as reactExports, k as noop, l as shouldThrowError, c as createLucideIcon, j as jsxRuntimeExports, b as bigintToNumber, D as Dialog, m as DialogContent, o as DialogHeader, p as DialogTitle, B as Button, q as DialogFooter, f as formatKhr, v as useId, w as Primitive, x as composeEventHandlers, y as createContextScope, z as useComposedRefs, A as useDirection, E as useControllableState, F as useCallbackRef, G as Presence, H as cn, d as useNavigate, I as LanguageSwitcher, X, J as FloatingContactButtons } from "./index-DzwzmQd8.js";
import { B as Badge } from "./badge-BLsWhtHR.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-C_MFbrfg.js";
import { I as Input, L as Label, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, e as createCollection } from "./select-YVq2fIQY.js";
import { T as Textarea } from "./textarea-CIMfzUdz.js";
import { a as useQuery, b as PayoutStatus, u as useActor, c as createActor } from "./backend-BGqH3Hc2.js";
import { u as ue, D as Download } from "./index-CtNL_-eh.js";
import { P as Phone } from "./phone-DctjWWXA.js";
import { Q as QrCode, C as CircleCheckBig } from "./qr-code-5hHf5Hbw.js";
import { m as makeApi } from "./api-DkfV3Yfa.js";
var MutationObserver = (_a = class extends Subscribable {
  constructor(client, options) {
    super();
    __privateAdd(this, _MutationObserver_instances);
    __privateAdd(this, _client);
    __privateAdd(this, _currentResult);
    __privateAdd(this, _currentMutation);
    __privateAdd(this, _mutateOptions);
    __privateSet(this, _client, client);
    this.setOptions(options);
    this.bindMethods();
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
  }
  bindMethods() {
    this.mutate = this.mutate.bind(this);
    this.reset = this.reset.bind(this);
  }
  setOptions(options) {
    var _a2;
    const prevOptions = this.options;
    this.options = __privateGet(this, _client).defaultMutationOptions(options);
    if (!shallowEqualObjects(this.options, prevOptions)) {
      __privateGet(this, _client).getMutationCache().notify({
        type: "observerOptionsUpdated",
        mutation: __privateGet(this, _currentMutation),
        observer: this
      });
    }
    if ((prevOptions == null ? void 0 : prevOptions.mutationKey) && this.options.mutationKey && hashKey(prevOptions.mutationKey) !== hashKey(this.options.mutationKey)) {
      this.reset();
    } else if (((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state.status) === "pending") {
      __privateGet(this, _currentMutation).setOptions(this.options);
    }
  }
  onUnsubscribe() {
    var _a2;
    if (!this.hasListeners()) {
      (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    }
  }
  onMutationUpdate(action) {
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this, action);
  }
  getCurrentResult() {
    return __privateGet(this, _currentResult);
  }
  reset() {
    var _a2;
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, void 0);
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this);
  }
  mutate(variables, options) {
    var _a2;
    __privateSet(this, _mutateOptions, options);
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, __privateGet(this, _client).getMutationCache().build(__privateGet(this, _client), this.options));
    __privateGet(this, _currentMutation).addObserver(this);
    return __privateGet(this, _currentMutation).execute(variables);
  }
}, _client = new WeakMap(), _currentResult = new WeakMap(), _currentMutation = new WeakMap(), _mutateOptions = new WeakMap(), _MutationObserver_instances = new WeakSet(), updateResult_fn = function() {
  var _a2;
  const state = ((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state) ?? getDefaultState();
  __privateSet(this, _currentResult, {
    ...state,
    isPending: state.status === "pending",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    isIdle: state.status === "idle",
    mutate: this.mutate,
    reset: this.reset
  });
}, notify_fn = function(action) {
  notifyManager.batch(() => {
    var _a2, _b, _c, _d, _e, _f, _g, _h;
    if (__privateGet(this, _mutateOptions) && this.hasListeners()) {
      const variables = __privateGet(this, _currentResult).variables;
      const onMutateResult = __privateGet(this, _currentResult).context;
      const context = {
        client: __privateGet(this, _client),
        meta: this.options.meta,
        mutationKey: this.options.mutationKey
      };
      if ((action == null ? void 0 : action.type) === "success") {
        try {
          (_b = (_a2 = __privateGet(this, _mutateOptions)).onSuccess) == null ? void 0 : _b.call(
            _a2,
            action.data,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_d = (_c = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _d.call(
            _c,
            action.data,
            null,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      } else if ((action == null ? void 0 : action.type) === "error") {
        try {
          (_f = (_e = __privateGet(this, _mutateOptions)).onError) == null ? void 0 : _f.call(
            _e,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_h = (_g = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _h.call(
            _g,
            void 0,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      }
    }
    this.listeners.forEach((listener) => {
      listener(__privateGet(this, _currentResult));
    });
  });
}, _a);
function useMutation(options, queryClient) {
  const client = useQueryClient();
  const [observer] = reactExports.useState(
    () => new MutationObserver(
      client,
      options
    )
  );
  reactExports.useEffect(() => {
    observer.setOptions(options);
  }, [observer, options]);
  const result = reactExports.useSyncExternalStore(
    reactExports.useCallback(
      (onStoreChange) => observer.subscribe(notifyManager.batchCalls(onStoreChange)),
      [observer]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  const mutate = reactExports.useCallback(
    (variables, mutateOptions) => {
      observer.mutate(variables, mutateOptions).catch(noop);
    },
    [observer]
  );
  if (result.error && shouldThrowError(observer.options.throwOnError, [result.error])) {
    throw result.error;
  }
  return { ...result, mutate, mutateAsync: result.mutate };
}
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$9 = [
  ["path", { d: "m16 3 4 4-4 4", key: "1x1c3m" }],
  ["path", { d: "M20 7H4", key: "zbl0bi" }],
  ["path", { d: "m8 21-4-4 4-4", key: "h9nckh" }],
  ["path", { d: "M4 17h16", key: "g4d7ey" }]
];
const ArrowRightLeft = createLucideIcon("arrow-right-left", __iconNode$9);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$8 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode$8);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$7 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode$7);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$6 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode$6);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  [
    "path",
    {
      d: "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",
      key: "1a0edw"
    }
  ],
  ["path", { d: "M12 22V12", key: "d0xqtd" }],
  ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }]
];
const Package = createLucideIcon("package", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7", key: "1m0v6g" }],
  [
    "path",
    {
      d: "M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",
      key: "ohrbg2"
    }
  ]
];
const SquarePen = createLucideIcon("square-pen", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
];
const User = createLucideIcon("user", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",
      key: "18etb6"
    }
  ],
  ["path", { d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4", key: "xoc0q4" }]
];
const Wallet = createLucideIcon("wallet", __iconNode);
function formatDate$2(ts) {
  return new Date(Number(ts) / 1e6).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
function StaffChampionsTab({ champions, api }) {
  const qc = useQueryClient();
  const [search, setSearch] = reactExports.useState("");
  const [selected, setSelected] = reactExports.useState(null);
  const [editMode, setEditMode] = reactExports.useState(false);
  const [regenConfirm, setRegenConfirm] = reactExports.useState(false);
  const [editName, setEditName] = reactExports.useState("");
  const [editBioEn, setEditBioEn] = reactExports.useState("");
  const [editLang, setEditLang] = reactExports.useState("en");
  const filtered = reactExports.useMemo(() => {
    const q = search.toLowerCase();
    return champions.filter(
      (c) => c.fullNameEn.toLowerCase().includes(q) || c.phoneNumber.includes(q) || (c.physicalQrCodeId ?? "").toLowerCase().includes(q) || (c.personalReferralCode ?? "").toLowerCase().includes(q)
    );
  }, [champions, search]);
  const { data: codes = [] } = useQuery({
    queryKey: ["championCodes", selected == null ? void 0 : selected.id],
    queryFn: () => api.getChampionCodes(selected.id),
    enabled: !!api && !!selected
  });
  const updateMutation = useMutation({
    mutationFn: async (input) => {
      if (!api || !selected) throw new Error("Not connected");
      await api.updateUser(selected.id, input);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["approvedChampions"] });
      ue.success("Champion updated!");
      setEditMode(false);
    },
    onError: (e) => ue.error("Update failed", { description: e.message })
  });
  const regenMutation = useMutation({
    mutationFn: async () => {
      if (!api || !selected) throw new Error("Not connected");
      return api.regenerateChampionQR(selected.id);
    },
    onSuccess: (newQrId) => {
      qc.invalidateQueries({ queryKey: ["approvedChampions"] });
      qc.invalidateQueries({ queryKey: ["championCodes", selected == null ? void 0 : selected.id] });
      ue.success("QR Code regenerated!", {
        description: `New ID: ${newQrId}`
      });
      setRegenConfirm(false);
    },
    onError: (e) => ue.error("Regeneration failed", { description: e.message })
  });
  function openEdit(c) {
    setEditName(c.fullNameEn);
    setEditBioEn(c.bioEn ?? "");
    setEditLang(c.preferredLanguage);
    setEditMode(true);
  }
  if (champions.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-20",
        "data-ocid": "staff.champions.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No approved champions yet." })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          className: "pl-9",
          placeholder: "Search by name, phone, QR code, or referral code…",
          value: search,
          onChange: (e) => setSearch(e.target.value),
          "data-ocid": "staff.champions.search_input"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
      filtered.length,
      " champion",
      filtered.length !== 1 ? "s" : ""
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3", "data-ocid": "staff.champions.list", children: filtered.map((champion, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: "border-border cursor-pointer hover:border-primary/40 transition-colors",
        onClick: () => {
          setSelected(champion);
          setEditMode(false);
          setRegenConfirm(false);
        },
        "data-ocid": `staff.champions.item.${idx + 1}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          champion.avatarUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: champion.avatarUrl,
              alt: "",
              loading: "lazy",
              className: "w-12 h-12 rounded-full object-cover border border-border flex-shrink-0"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0 border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-muted-foreground font-semibold", children: champion.fullNameEn.charAt(0) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: champion.fullNameEn }),
              champion.fullNameKm && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: champion.fullNameKm })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 mt-1 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3 h-3" }),
                champion.phoneNumber
              ] }),
              champion.personalReferralCode && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: champion.personalReferralCode }),
              champion.physicalQrCodeId && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "w-3 h-3" }),
                champion.physicalQrCodeId
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-shrink-0 text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Inventory held" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-foreground", children: [
              bigintToNumber(champion.consignmentInventoryHeld),
              " units"
            ] })
          ] })
        ] }) })
      },
      String(champion.id)
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: !!selected,
        onOpenChange: (o) => {
          if (!o) {
            setSelected(null);
            setEditMode(false);
            setRegenConfirm(false);
          }
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DialogContent,
          {
            className: "max-w-xl max-h-[90vh] overflow-y-auto",
            "data-ocid": "staff.champion_detail.dialog",
            children: [
              selected && !editMode && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Champion Details" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                    selected.avatarUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: selected.avatarUrl,
                        alt: "",
                        loading: "lazy",
                        className: "w-16 h-16 rounded-full object-cover border-2 border-border"
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted flex items-center justify-center border-2 border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-display text-muted-foreground", children: selected.fullNameEn.charAt(0) }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-lg text-foreground", children: selected.fullNameEn }),
                      selected.fullNameKm && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: selected.fullNameKm }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground flex items-center gap-1 mt-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3.5 h-3.5" }),
                        selected.phoneNumber
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-lg p-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Target Monthly Income" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-foreground text-sm", children: [
                        bigintToNumber(
                          selected.targetMonthlyIncomeKhr
                        ).toLocaleString(),
                        " ",
                        "ល"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                        "($",
                        bigintToNumber(selected.targetMonthlyIncomeUsd),
                        " USD)"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-lg p-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Inventory Held" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-foreground text-sm", children: [
                        bigintToNumber(selected.consignmentInventoryHeld),
                        " units"
                      ] })
                    ] }),
                    selected.approvedAt && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-lg p-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Approved" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: formatDate$2(selected.approvedAt) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-lg p-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Language" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm uppercase", children: selected.preferredLanguage })
                    ] })
                  ] }),
                  selected.bioEn && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2", children: "Story" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed bg-muted/30 rounded-md p-3", children: selected.bioEn })
                  ] }),
                  codes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2", children: "Champion Codes" }),
                    codes.map((code) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "bg-muted/30 rounded-lg p-3 space-y-1",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Referral Code" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Badge,
                              {
                                variant: "outline",
                                className: "font-mono text-xs",
                                children: code.referralCode
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "QR Code ID" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-foreground", children: code.qrCodeId })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                              "Hotel orders via QR:",
                              " ",
                              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: bigintToNumber(code.timesUsedForHotelOrders) })
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                              "Referrals:",
                              " ",
                              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: bigintToNumber(
                                code.timesUsedForChampionReferrals
                              ) })
                            ] })
                          ] })
                        ]
                      },
                      String(code.id)
                    ))
                  ] }),
                  !regenConfirm ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      type: "button",
                      variant: "outline",
                      size: "sm",
                      className: "gap-1.5 w-full",
                      onClick: () => setRegenConfirm(true),
                      "data-ocid": "staff.champion_detail.regen_qr_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
                        "Regenerate QR Code"
                      ]
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-destructive/10 border border-destructive/30 rounded-lg p-3 space-y-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive font-medium", children: "⚠ This will invalidate the current QR code. Are you sure?" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          type: "button",
                          variant: "outline",
                          size: "sm",
                          onClick: () => setRegenConfirm(false),
                          "data-ocid": "staff.regen_qr.cancel_button",
                          children: "Cancel"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          type: "button",
                          variant: "destructive",
                          size: "sm",
                          disabled: regenMutation.isPending,
                          onClick: () => regenMutation.mutate(),
                          "data-ocid": "staff.regen_qr.confirm_button",
                          children: regenMutation.isPending ? "Regenerating…" : "Yes, Regenerate"
                        }
                      )
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      variant: "outline",
                      onClick: () => setSelected(null),
                      "data-ocid": "staff.champion_detail.close_button",
                      children: "Close"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      type: "button",
                      className: "gap-1.5",
                      onClick: () => openEdit(selected),
                      "data-ocid": "staff.champion_detail.edit_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "w-4 h-4" }),
                        "Edit Champion"
                      ]
                    }
                  )
                ] })
              ] }),
              selected && editMode && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display", children: [
                  "Edit Champion — ",
                  selected.fullNameEn
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Full Name (English) *" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        value: editName,
                        onChange: (e) => setEditName(e.target.value),
                        "data-ocid": "staff.edit_champion.name_input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Story (English)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Textarea,
                      {
                        rows: 3,
                        value: editBioEn,
                        onChange: (e) => setEditBioEn(e.target.value),
                        "data-ocid": "staff.edit_champion.bio_input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Preferred Language" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: editLang, onValueChange: setEditLang, children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "staff.edit_champion.lang_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "en", children: "English" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "km", children: "ភាសាខ្មែរ" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "fr", children: "Français" })
                      ] })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      variant: "outline",
                      onClick: () => setEditMode(false),
                      "data-ocid": "staff.edit_champion.cancel_button",
                      children: "Cancel"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      disabled: updateMutation.isPending || !editName.trim(),
                      onClick: () => updateMutation.mutate({
                        fullNameEn: editName,
                        bioEn: editBioEn || void 0,
                        preferredLanguage: editLang
                      }),
                      "data-ocid": "staff.edit_champion.save_button",
                      children: updateMutation.isPending ? "Saving…" : "Save Changes"
                    }
                  )
                ] })
              ] })
            ]
          }
        )
      }
    )
  ] });
}
function formatDate$1(ts) {
  return new Date(Number(ts) / 1e6).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
const statusConfig = {
  out: { label: "Out", className: "border-amber-500 text-amber-600" },
  returned: { label: "Returned", className: "border-accent text-accent" },
  sold: { label: "Sold", className: "border-primary text-primary" }
};
function StaffConsignmentTab({ champions, products, api }) {
  const qc = useQueryClient();
  const [viewChampId, setViewChampId] = reactExports.useState("");
  const [checkoutChampId, setCheckoutChampId] = reactExports.useState("");
  const [productId, setProductId] = reactExports.useState("");
  const [quantity, setQuantity] = reactExports.useState("1");
  const viewId = viewChampId ? BigInt(viewChampId) : null;
  const { data: history = [], isLoading: histLoading } = useQuery({
    queryKey: ["consignment", viewId],
    queryFn: () => api.getConsignmentByChampion(viewId),
    enabled: !!api && !!viewId
  });
  const checkoutMutation = useMutation({
    mutationFn: async () => {
      if (!api) throw new Error("Not connected");
      await api.checkoutConsignment({
        championId: BigInt(checkoutChampId),
        productId: BigInt(productId),
        quantity: BigInt(quantity),
        staffId: BigInt(1)
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["consignment"] });
      qc.invalidateQueries({ queryKey: ["approvedChampions"] });
      ue.success("Consignment checked out!");
      setCheckoutChampId("");
      setProductId("");
      setQuantity("1");
    },
    onError: (e) => ue.error("Checkout failed", { description: e.message })
  });
  const selectedProduct = products.find((p) => String(p.id) === productId);
  const selectedChampion = champions.find(
    (c) => String(c.id) === checkoutChampId
  );
  const canCheckout = !!checkoutChampId && !!productId && Number.parseInt(quantity) > 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-display flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRightLeft, { className: "w-5 h-5 text-primary" }),
        "Check Out Consignment"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Champion" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: checkoutChampId, onValueChange: setCheckoutChampId, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "staff.consignment.champion_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select a champion…" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: champions.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: String(c.id), children: [
              c.fullNameEn,
              " — ",
              c.phoneNumber
            ] }, String(c.id))) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Product" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: productId, onValueChange: setProductId, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "staff.consignment.product_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select a product…" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: products.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: String(p.id), children: [
              p.nameEn,
              " —",
              " ",
              formatKhr(bigintToNumber(p.wholesalePriceKhr))
            ] }, String(p.id))) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Quantity" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              min: "1",
              value: quantity,
              onChange: (e) => setQuantity(e.target.value),
              "data-ocid": "staff.consignment.quantity_input"
            }
          )
        ] }),
        selectedChampion && selectedProduct && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-lg p-3 space-y-1 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: "Checkout Summary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: selectedChampion.fullNameEn }),
            " gets ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-medium", children: [
              quantity,
              "x ",
              selectedProduct.nameEn
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
            "Wholesale value:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: formatKhr(
              bigintToNumber(selectedProduct.wholesalePriceKhr) * Number.parseInt(quantity || "0")
            ) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            className: "w-full",
            disabled: !canCheckout || checkoutMutation.isPending,
            onClick: () => checkoutMutation.mutate(),
            "data-ocid": "staff.consignment.submit_button",
            children: checkoutMutation.isPending ? "Processing…" : "Check Out Consignment"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-display flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-5 h-5 text-primary" }),
        "Consignment History"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "View history for champion" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: viewChampId, onValueChange: setViewChampId, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "staff.consignment.history_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select champion…" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: champions.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: String(c.id), children: c.fullNameEn }, String(c.id))) })
          ] })
        ] }),
        histLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "space-y-2",
            "data-ocid": "staff.consignment.loading_state",
            children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-14 bg-muted animate-pulse rounded-md"
              },
              i
            ))
          }
        ),
        !histLoading && viewId && history.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "text-center py-8",
            "data-ocid": "staff.consignment.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-50" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No consignment history." })
            ]
          }
        ),
        !histLoading && history.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "space-y-2",
            "data-ocid": "staff.consignment.history_list",
            children: history.map((item, idx) => {
              const cfg = statusConfig[item.status] ?? {
                label: item.status,
                className: ""
              };
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-3 p-3 bg-muted/30 rounded-lg",
                  "data-ocid": `staff.consignment.item.${idx + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4 text-muted-foreground flex-shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-foreground", children: [
                        "Product #",
                        String(item.productId)
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                        bigintToNumber(item.quantity),
                        " units ·",
                        " ",
                        formatDate$1(item.checkedOutAt)
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: "outline",
                        className: `text-xs ${cfg.className}`,
                        children: cfg.label
                      }
                    )
                  ]
                },
                String(item.id)
              );
            })
          }
        )
      ] })
    ] })
  ] });
}
const methodLabel = {
  cash: "Cash",
  bank_transfer: "Bank Transfer",
  wing: "Wing"
};
function StaffPayoutsTab({ payouts, champions, api }) {
  const qc = useQueryClient();
  const [cycleStart, setCycleStart] = reactExports.useState("");
  const [cycleEnd, setCycleEnd] = reactExports.useState("");
  const championMap = new Map(champions.map((c) => [String(c.id), c]));
  const generateMutation = useMutation({
    mutationFn: async () => {
      if (!api) throw new Error("Not connected");
      await api.generatePayoutLedger(cycleStart, cycleEnd);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["pendingPayouts"] });
      ue.success("Payout ledger generated!");
    },
    onError: (e) => ue.error("Failed to generate ledger", { description: e.message })
  });
  const markPaidMutation = useMutation({
    mutationFn: async (payoutId) => {
      if (!api) throw new Error("Not connected");
      await api.markPayoutProcessed(payoutId, BigInt(1));
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["pendingPayouts"] });
      ue.success("Payout marked as paid!");
    },
    onError: (e) => ue.error("Failed to mark paid", { description: e.message })
  });
  function exportCsv() {
    const headers = [
      "Champion Name",
      "Phone",
      "Cycle Start",
      "Cycle End",
      "Total KHR",
      "Total USD",
      "Orders",
      "Method",
      "Status"
    ];
    const rows = payouts.map((p) => {
      const c = championMap.get(String(p.championId));
      return [
        (c == null ? void 0 : c.fullNameEn) ?? String(p.championId),
        (c == null ? void 0 : c.phoneNumber) ?? "",
        p.payoutCycleStart,
        p.payoutCycleEnd,
        bigintToNumber(p.totalCommissionKhr),
        p.totalCommissionUsd.toFixed(2),
        bigintToNumber(p.totalOrdersCount),
        methodLabel[p.payoutMethod] ?? p.payoutMethod,
        p.payoutStatus
      ];
    });
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `payouts-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    ue.success("CSV exported!");
  }
  const pending = payouts.filter(
    (p) => p.payoutStatus === PayoutStatus.pending
  );
  const totalKhr = pending.reduce(
    (s, p) => s + bigintToNumber(p.totalCommissionKhr),
    0
  );
  const totalUsd = pending.reduce((s, p) => s + p.totalCommissionUsd, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-display flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-5 h-5 text-primary" }),
        "Generate Payout Ledger"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 flex-1 min-w-[140px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Cycle Start" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "date",
              value: cycleStart,
              onChange: (e) => setCycleStart(e.target.value),
              "data-ocid": "staff.payouts.cycle_start_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 flex-1 min-w-[140px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Cycle End" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "date",
              value: cycleEnd,
              onChange: (e) => setCycleEnd(e.target.value),
              "data-ocid": "staff.payouts.cycle_end_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            disabled: !cycleStart || !cycleEnd || generateMutation.isPending,
            onClick: () => generateMutation.mutate(),
            className: "gap-2",
            "data-ocid": "staff.payouts.generate_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
              generateMutation.isPending ? "Generating…" : "Generate"
            ]
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-lg px-4 py-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Pending Payouts" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-xl text-foreground", children: pending.length })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-lg px-4 py-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Total Pending (KHR)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-bold text-xl text-primary", children: [
            totalKhr.toLocaleString(),
            " ល"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "($",
            totalUsd.toFixed(2),
            " USD)"
          ] })
        ] })
      ] }),
      payouts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          className: "gap-2",
          onClick: exportCsv,
          "data-ocid": "staff.payouts.export_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
            "Export CSV"
          ]
        }
      )
    ] }),
    pending.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-16 bg-muted/20 rounded-xl border border-border",
        "data-ocid": "staff.payouts.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "No pending payouts" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Generate a payout ledger to see results here." })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", "data-ocid": "staff.payouts.table", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium text-muted-foreground", children: "Champion" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium text-muted-foreground", children: "Cycle" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium text-muted-foreground", children: "Commission (KHR)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium text-muted-foreground", children: "Orders" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center px-4 py-3 font-medium text-muted-foreground", children: "Method" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center px-4 py-3 font-medium text-muted-foreground", children: "Action" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: pending.map((payout, idx) => {
        const champ = championMap.get(String(payout.championId));
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "hover:bg-muted/20 transition-colors",
            "data-ocid": `staff.payouts.item.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                (champ == null ? void 0 : champ.avatarUrl) ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: champ.avatarUrl,
                    alt: "",
                    loading: "lazy",
                    className: "w-7 h-7 rounded-full object-cover"
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-display text-muted-foreground", children: (champ == null ? void 0 : champ.fullNameEn.charAt(0)) ?? "?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: (champ == null ? void 0 : champ.fullNameEn) ?? `#${String(payout.championId)}` }),
                  (champ == null ? void 0 : champ.phoneNumber) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: champ.phoneNumber })
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", children: payout.payoutCycleStart }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs", children: [
                  "→ ",
                  payout.payoutCycleEnd
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-primary text-base", children: [
                  bigintToNumber(
                    payout.totalCommissionKhr
                  ).toLocaleString(),
                  " ",
                  "ល"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  "($",
                  payout.totalCommissionUsd.toFixed(2),
                  ")"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-medium text-foreground", children: bigintToNumber(payout.totalOrdersCount) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: methodLabel[payout.payoutMethod] ?? payout.payoutMethod }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  size: "sm",
                  className: "bg-accent text-accent-foreground hover:bg-accent/90 gap-1.5 text-xs",
                  disabled: markPaidMutation.isPending,
                  onClick: () => markPaidMutation.mutate(payout.id),
                  "data-ocid": `staff.payouts.mark_paid_button.${idx + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3.5 h-3.5" }),
                    "Mark Paid"
                  ]
                }
              ) })
            ]
          },
          String(payout.id)
        );
      }) })
    ] }) }) })
  ] });
}
var ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
var EVENT_OPTIONS = { bubbles: false, cancelable: true };
var GROUP_NAME = "RovingFocusGroup";
var [Collection, useCollection, createCollectionScope] = createCollection(GROUP_NAME);
var [createRovingFocusGroupContext, createRovingFocusGroupScope] = createContextScope(
  GROUP_NAME,
  [createCollectionScope]
);
var [RovingFocusProvider, useRovingFocusContext] = createRovingFocusGroupContext(GROUP_NAME);
var RovingFocusGroup = reactExports.forwardRef(
  (props, forwardedRef) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Provider, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Slot, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ jsxRuntimeExports.jsx(RovingFocusGroupImpl, { ...props, ref: forwardedRef }) }) });
  }
);
RovingFocusGroup.displayName = GROUP_NAME;
var RovingFocusGroupImpl = reactExports.forwardRef((props, forwardedRef) => {
  const {
    __scopeRovingFocusGroup,
    orientation,
    loop = false,
    dir,
    currentTabStopId: currentTabStopIdProp,
    defaultCurrentTabStopId,
    onCurrentTabStopIdChange,
    onEntryFocus,
    preventScrollOnEntryFocus = false,
    ...groupProps
  } = props;
  const ref = reactExports.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  const direction = useDirection(dir);
  const [currentTabStopId, setCurrentTabStopId] = useControllableState({
    prop: currentTabStopIdProp,
    defaultProp: defaultCurrentTabStopId ?? null,
    onChange: onCurrentTabStopIdChange,
    caller: GROUP_NAME
  });
  const [isTabbingBackOut, setIsTabbingBackOut] = reactExports.useState(false);
  const handleEntryFocus = useCallbackRef(onEntryFocus);
  const getItems = useCollection(__scopeRovingFocusGroup);
  const isClickFocusRef = reactExports.useRef(false);
  const [focusableItemsCount, setFocusableItemsCount] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener(ENTRY_FOCUS, handleEntryFocus);
      return () => node.removeEventListener(ENTRY_FOCUS, handleEntryFocus);
    }
  }, [handleEntryFocus]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    RovingFocusProvider,
    {
      scope: __scopeRovingFocusGroup,
      orientation,
      dir: direction,
      loop,
      currentTabStopId,
      onItemFocus: reactExports.useCallback(
        (tabStopId) => setCurrentTabStopId(tabStopId),
        [setCurrentTabStopId]
      ),
      onItemShiftTab: reactExports.useCallback(() => setIsTabbingBackOut(true), []),
      onFocusableItemAdd: reactExports.useCallback(
        () => setFocusableItemsCount((prevCount) => prevCount + 1),
        []
      ),
      onFocusableItemRemove: reactExports.useCallback(
        () => setFocusableItemsCount((prevCount) => prevCount - 1),
        []
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          tabIndex: isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0,
          "data-orientation": orientation,
          ...groupProps,
          ref: composedRefs,
          style: { outline: "none", ...props.style },
          onMouseDown: composeEventHandlers(props.onMouseDown, () => {
            isClickFocusRef.current = true;
          }),
          onFocus: composeEventHandlers(props.onFocus, (event) => {
            const isKeyboardFocus = !isClickFocusRef.current;
            if (event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut) {
              const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
              event.currentTarget.dispatchEvent(entryFocusEvent);
              if (!entryFocusEvent.defaultPrevented) {
                const items = getItems().filter((item) => item.focusable);
                const activeItem = items.find((item) => item.active);
                const currentItem = items.find((item) => item.id === currentTabStopId);
                const candidateItems = [activeItem, currentItem, ...items].filter(
                  Boolean
                );
                const candidateNodes = candidateItems.map((item) => item.ref.current);
                focusFirst(candidateNodes, preventScrollOnEntryFocus);
              }
            }
            isClickFocusRef.current = false;
          }),
          onBlur: composeEventHandlers(props.onBlur, () => setIsTabbingBackOut(false))
        }
      )
    }
  );
});
var ITEM_NAME = "RovingFocusGroupItem";
var RovingFocusGroupItem = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeRovingFocusGroup,
      focusable = true,
      active = false,
      tabStopId,
      children,
      ...itemProps
    } = props;
    const autoId = useId();
    const id = tabStopId || autoId;
    const context = useRovingFocusContext(ITEM_NAME, __scopeRovingFocusGroup);
    const isCurrentTabStop = context.currentTabStopId === id;
    const getItems = useCollection(__scopeRovingFocusGroup);
    const { onFocusableItemAdd, onFocusableItemRemove, currentTabStopId } = context;
    reactExports.useEffect(() => {
      if (focusable) {
        onFocusableItemAdd();
        return () => onFocusableItemRemove();
      }
    }, [focusable, onFocusableItemAdd, onFocusableItemRemove]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Collection.ItemSlot,
      {
        scope: __scopeRovingFocusGroup,
        id,
        focusable,
        active,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.span,
          {
            tabIndex: isCurrentTabStop ? 0 : -1,
            "data-orientation": context.orientation,
            ...itemProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!focusable) event.preventDefault();
              else context.onItemFocus(id);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => context.onItemFocus(id)),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if (event.key === "Tab" && event.shiftKey) {
                context.onItemShiftTab();
                return;
              }
              if (event.target !== event.currentTarget) return;
              const focusIntent = getFocusIntent(event, context.orientation, context.dir);
              if (focusIntent !== void 0) {
                if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
                event.preventDefault();
                const items = getItems().filter((item) => item.focusable);
                let candidateNodes = items.map((item) => item.ref.current);
                if (focusIntent === "last") candidateNodes.reverse();
                else if (focusIntent === "prev" || focusIntent === "next") {
                  if (focusIntent === "prev") candidateNodes.reverse();
                  const currentIndex = candidateNodes.indexOf(event.currentTarget);
                  candidateNodes = context.loop ? wrapArray(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
                }
                setTimeout(() => focusFirst(candidateNodes));
              }
            }),
            children: typeof children === "function" ? children({ isCurrentTabStop, hasTabStop: currentTabStopId != null }) : children
          }
        )
      }
    );
  }
);
RovingFocusGroupItem.displayName = ITEM_NAME;
var MAP_KEY_TO_FOCUS_INTENT = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function getDirectionAwareKey(key, dir) {
  if (dir !== "rtl") return key;
  return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
}
function getFocusIntent(event, orientation, dir) {
  const key = getDirectionAwareKey(event.key, dir);
  if (orientation === "vertical" && ["ArrowLeft", "ArrowRight"].includes(key)) return void 0;
  if (orientation === "horizontal" && ["ArrowUp", "ArrowDown"].includes(key)) return void 0;
  return MAP_KEY_TO_FOCUS_INTENT[key];
}
function focusFirst(candidates, preventScroll = false) {
  const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
  for (const candidate of candidates) {
    if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
    candidate.focus({ preventScroll });
    if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
  }
}
function wrapArray(array, startIndex) {
  return array.map((_, index) => array[(startIndex + index) % array.length]);
}
var Root = RovingFocusGroup;
var Item = RovingFocusGroupItem;
var TABS_NAME = "Tabs";
var [createTabsContext] = createContextScope(TABS_NAME, [
  createRovingFocusGroupScope
]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
var Tabs$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeTabs,
      value: valueProp,
      onValueChange,
      defaultValue,
      orientation = "horizontal",
      dir,
      activationMode = "automatic",
      ...tabsProps
    } = props;
    const direction = useDirection(dir);
    const [value, setValue] = useControllableState({
      prop: valueProp,
      onChange: onValueChange,
      defaultProp: defaultValue ?? "",
      caller: TABS_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      TabsProvider,
      {
        scope: __scopeTabs,
        baseId: useId(),
        value,
        onValueChange: setValue,
        orientation,
        dir: direction,
        activationMode,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            dir: direction,
            "data-orientation": orientation,
            ...tabsProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
Tabs$1.displayName = TABS_NAME;
var TAB_LIST_NAME = "TabsList";
var TabsList$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, loop = true, ...listProps } = props;
    const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Root,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        orientation: context.orientation,
        dir: context.dir,
        loop,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            role: "tablist",
            "aria-orientation": context.orientation,
            ...listProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
TabsList$1.displayName = TAB_LIST_NAME;
var TRIGGER_NAME = "TabsTrigger";
var TabsTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
    const context = useTabsContext(TRIGGER_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Item,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !disabled,
        active: isSelected,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": isSelected,
            "aria-controls": contentId,
            "data-state": isSelected ? "active" : "inactive",
            "data-disabled": disabled ? "" : void 0,
            disabled,
            id: triggerId,
            ...triggerProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!disabled && event.button === 0 && event.ctrlKey === false) {
                context.onValueChange(value);
              } else {
                event.preventDefault();
              }
            }),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if ([" ", "Enter"].includes(event.key)) context.onValueChange(value);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => {
              const isAutomaticActivation = context.activationMode !== "manual";
              if (!isSelected && !disabled && isAutomaticActivation) {
                context.onValueChange(value);
              }
            })
          }
        )
      }
    );
  }
);
TabsTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "TabsContent";
var TabsContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
    const context = useTabsContext(CONTENT_NAME, __scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    const isMountAnimationPreventedRef = reactExports.useRef(isSelected);
    reactExports.useEffect(() => {
      const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
      return () => cancelAnimationFrame(rAF);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || isSelected, children: ({ present }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": isSelected ? "active" : "inactive",
        "data-orientation": context.orientation,
        role: "tabpanel",
        "aria-labelledby": triggerId,
        hidden: !present,
        id: contentId,
        tabIndex: 0,
        ...contentProps,
        ref: forwardedRef,
        style: {
          ...props.style,
          animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0
        },
        children: present && children
      }
    ) });
  }
);
TabsContent$1.displayName = CONTENT_NAME;
function makeTriggerId(baseId, value) {
  return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
  return `${baseId}-content-${value}`;
}
var Root2 = Tabs$1;
var List = TabsList$1;
var Trigger = TabsTrigger$1;
var Content = TabsContent$1;
function Tabs({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root2,
    {
      "data-slot": "tabs",
      className: cn("flex flex-col gap-2", className),
      ...props
    }
  );
}
function TabsList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    List,
    {
      "data-slot": "tabs-list",
      className: cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      ),
      ...props
    }
  );
}
function TabsTrigger({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Trigger,
    {
      "data-slot": "tabs-trigger",
      className: cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function TabsContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content,
    {
      "data-slot": "tabs-content",
      className: cn("flex-1 outline-none", className),
      ...props
    }
  );
}
function formatDate(ts) {
  return new Date(Number(ts) / 1e6).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
function StaffPendingTab({ pending, api }) {
  const qc = useQueryClient();
  const [approveTarget, setApproveTarget] = reactExports.useState(null);
  const [rejectTarget, setRejectTarget] = reactExports.useState(null);
  const [notesEn, setNotesEn] = reactExports.useState("");
  const [notesKm, setNotesKm] = reactExports.useState("");
  const [notesFr, setNotesFr] = reactExports.useState("");
  const [qrImageUrl, setQrImageUrl] = reactExports.useState("");
  const [rejectReason, setRejectReason] = reactExports.useState("");
  const [expandedId, setExpandedId] = reactExports.useState(null);
  const approveMutation = useMutation({
    mutationFn: async ({
      userId,
      input
    }) => {
      if (!api) throw new Error("Not connected");
      await api.approveChampion(userId, input);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["pendingChampions"] });
      qc.invalidateQueries({ queryKey: ["approvedChampions"] });
      ue.success("Champion approved!", {
        description: "QR and referral codes have been generated."
      });
      setApproveTarget(null);
      setNotesEn("");
      setNotesKm("");
      setNotesFr("");
      setQrImageUrl("");
    },
    onError: (e) => ue.error("Approval failed", { description: e.message })
  });
  const rejectMutation = useMutation({
    mutationFn: async ({
      userId,
      reason
    }) => {
      if (!api) throw new Error("Not connected");
      await api.rejectChampion(userId, reason);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["pendingChampions"] });
      ue.success("Application rejected");
      setRejectTarget(null);
      setRejectReason("");
    },
    onError: (e) => ue.error("Rejection failed", { description: e.message })
  });
  if (pending.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-20", "data-ocid": "staff.pending.empty_state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-12 h-12 text-accent mx-auto mb-4 opacity-60" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-foreground mb-2", children: "All caught up!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No pending champion applications to review." })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "staff.pending.list", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
      pending.length,
      " application",
      pending.length !== 1 ? "s" : "",
      " awaiting review"
    ] }),
    pending.map((champion, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: "border-border",
        "data-ocid": `staff.pending.item.${idx + 1}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children: champion.avatarUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: champion.avatarUrl,
              alt: champion.fullNameEn,
              loading: "lazy",
              className: "w-14 h-14 rounded-full object-cover border-2 border-border"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-muted flex items-center justify-center border-2 border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-display text-muted-foreground", children: champion.fullNameEn.charAt(0).toUpperCase() }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground font-display", children: champion.fullNameEn }),
              champion.fullNameKm && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: champion.fullNameKm }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  variant: "outline",
                  className: "text-xs border-amber-500 text-amber-600",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3 mr-1" }),
                    "Pending"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 text-sm text-muted-foreground mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3.5 h-3.5" }),
                champion.phoneNumber
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5" }),
                "Applied ",
                formatDate(champion.createdAt)
              ] }),
              champion.referredByCode && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs", children: [
                "Ref: ",
                champion.referredByCode
              ] })
            ] }),
            champion.bioEn && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "text-xs text-primary hover:underline",
                  onClick: () => setExpandedId(
                    expandedId === champion.id ? null : champion.id
                  ),
                  "data-ocid": `staff.pending.expand_bio.${idx + 1}`,
                  children: expandedId === champion.id ? "Hide story ▲" : "Read story ▼"
                }
              ),
              expandedId === champion.id ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-foreground bg-muted/40 rounded-md p-3 leading-relaxed", children: champion.bioEn }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground line-clamp-2 mt-1", children: champion.bioEn })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-shrink-0 flex flex-col gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                size: "sm",
                className: "bg-accent text-accent-foreground hover:bg-accent/90 gap-1.5",
                onClick: () => setApproveTarget(champion),
                "data-ocid": `staff.pending.approve_button.${idx + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4" }),
                  "Approve"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                size: "sm",
                variant: "destructive",
                className: "gap-1.5",
                onClick: () => setRejectTarget(champion),
                "data-ocid": `staff.pending.reject_button.${idx + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4" }),
                  "Reject"
                ]
              }
            )
          ] })
        ] }) })
      },
      String(champion.id)
    )),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: !!approveTarget,
        onOpenChange: (o) => !o && setApproveTarget(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg", "data-ocid": "staff.approve.dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Approve Champion" }) }),
          approveTarget && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 bg-muted/40 rounded-lg", children: [
              approveTarget.avatarUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: approveTarget.avatarUrl,
                  alt: "",
                  loading: "lazy",
                  className: "w-10 h-10 rounded-full object-cover"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-muted-foreground", children: approveTarget.fullNameEn.charAt(0) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: approveTarget.fullNameEn }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: approveTarget.phoneNumber })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-sm font-medium flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "w-4 h-4" }),
                "QR Code Image URL (optional)"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  placeholder: "https://... or leave blank to auto-generate",
                  value: qrImageUrl,
                  onChange: (e) => setQrImageUrl(e.target.value),
                  "data-ocid": "staff.approve.qr_input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "A QR code ID will be auto-generated on approval." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Staff Notes" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "en", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "h-8", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "en", className: "text-xs h-6", children: "English" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "km", className: "text-xs h-6", children: "ខ្មែរ" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "fr", className: "text-xs h-6", children: "Français" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "en", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Textarea,
                  {
                    rows: 2,
                    placeholder: "Notes in English...",
                    value: notesEn,
                    onChange: (e) => setNotesEn(e.target.value),
                    "data-ocid": "staff.approve.notes_en"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "km", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Textarea,
                  {
                    rows: 2,
                    placeholder: "ចំណាំជាភាសាខ្មែរ...",
                    value: notesKm,
                    onChange: (e) => setNotesKm(e.target.value),
                    "data-ocid": "staff.approve.notes_km"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "fr", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Textarea,
                  {
                    rows: 2,
                    placeholder: "Notes en français...",
                    value: notesFr,
                    onChange: (e) => setNotesFr(e.target.value),
                    "data-ocid": "staff.approve.notes_fr"
                  }
                ) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: () => setApproveTarget(null),
                "data-ocid": "staff.approve.cancel_button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                className: "bg-accent text-accent-foreground hover:bg-accent/90",
                disabled: approveMutation.isPending,
                onClick: () => {
                  if (!approveTarget) return;
                  const input = {
                    ...notesEn && { notesEn },
                    ...notesKm && { notesKm },
                    ...notesFr && { notesFr },
                    ...qrImageUrl && { qrCodeImageUrl: qrImageUrl }
                  };
                  approveMutation.mutate({ userId: approveTarget.id, input });
                },
                "data-ocid": "staff.approve.confirm_button",
                children: approveMutation.isPending ? "Approving…" : "Confirm Approval"
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: !!rejectTarget,
        onOpenChange: (o) => !o && setRejectTarget(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", "data-ocid": "staff.reject.dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-destructive", children: "Reject Application" }) }),
          rejectTarget && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              "You are about to reject",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: rejectTarget.fullNameEn }),
              "'s application."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Reason for rejection" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  rows: 3,
                  placeholder: "Provide a reason (optional)...",
                  value: rejectReason,
                  onChange: (e) => setRejectReason(e.target.value),
                  "data-ocid": "staff.reject.reason_input"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: () => setRejectTarget(null),
                "data-ocid": "staff.reject.cancel_button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "destructive",
                disabled: rejectMutation.isPending,
                onClick: () => {
                  if (!rejectTarget) return;
                  rejectMutation.mutate({
                    userId: rejectTarget.id,
                    reason: rejectReason
                  });
                },
                "data-ocid": "staff.reject.confirm_button",
                children: rejectMutation.isPending ? "Rejecting…" : "Confirm Rejection"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
function StaffPortal() {
  const { actor, isFetching } = useActor(createActor);
  const navigate = useNavigate();
  const api = actor ? makeApi(actor) : null;
  const { data: pendingChampions = [] } = useQuery({
    queryKey: ["pendingChampions"],
    queryFn: () => api.getPendingChampions(),
    enabled: !!api && !isFetching
  });
  const { data: approvedChampions = [] } = useQuery({
    queryKey: ["approvedChampions"],
    queryFn: () => api.getApprovedChampions(),
    enabled: !!api && !isFetching
  });
  const { data: products = [] } = useQuery({
    queryKey: ["activeProducts"],
    queryFn: () => api.getActiveProducts(),
    enabled: !!api && !isFetching
  });
  const { data: pendingPayouts = [] } = useQuery({
    queryKey: ["pendingPayouts"],
    queryFn: () => api.getPendingPayouts(),
    enabled: !!api && !isFetching
  });
  if (isFetching) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full border-4 border-primary/30 border-t-primary animate-spin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Connecting to backend…" })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "bg-card border-b border-border shadow-sm sticky top-0 z-40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4 text-primary-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-display font-semibold text-foreground", children: "Staff Portal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Kampot Heritage Impact Network" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LanguageSwitcher, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            variant: "outline",
            className: "border-accent text-accent font-body text-xs",
            children: "Staff Access"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => navigate("/"),
            "aria-label": "Back to home",
            "data-ocid": "staff.portal.close_button",
            className: "w-8 h-8 flex items-center justify-center rounded-full bg-muted hover:bg-muted-foreground/20 text-muted-foreground hover:text-foreground transition-colors",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "pending", className: "w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        TabsList,
        {
          className: "grid w-full grid-cols-4 mb-6 bg-muted/60",
          "data-ocid": "staff.tabs",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              TabsTrigger,
              {
                value: "pending",
                className: "gap-2",
                "data-ocid": "staff.pending_tab",
                children: [
                  "Pending",
                  pendingChampions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "ml-1 h-5 min-w-5 text-xs px-1.5 bg-destructive text-destructive-foreground", children: pendingChampions.length })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "champions", "data-ocid": "staff.champions_tab", children: "Champions" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "consignment", "data-ocid": "staff.consignment_tab", children: "Consignment" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "payouts", "data-ocid": "staff.payouts_tab", children: "Payouts" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "pending", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StaffPendingTab, { pending: pendingChampions, api }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "champions", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StaffChampionsTab, { champions: approvedChampions, api }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "consignment", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        StaffConsignmentTab,
        {
          champions: approvedChampions,
          products,
          api
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "payouts", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        StaffPayoutsTab,
        {
          payouts: pendingPayouts,
          champions: approvedChampions,
          api
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingContactButtons, {})
  ] });
}
export {
  StaffPortal as default
};
