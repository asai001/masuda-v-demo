import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  TrendingUp,
  DollarSign,
  FileText,
  Plus,
  Search,
  Edit,
  Trash2,
  X,
  Save,
  Download,
  Upload,
  AlertCircle,
  CheckCircle,
  Clock,
  Package,
  Bell,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";
import { DashboardSummary } from "./components/DashboardSummary";
import { QuickActions } from "./components/QuickActions";
import { Alerts } from "./components/Alerts";
import { TodayTasks } from "./components/TodayTasks";
import { RecentActivity } from "./components/RecentActivity";
import { SalesByCustomer } from "./components/SalesByCustomer";
import { CashFlow } from "./components/CashFlow";

const App = () => {
  const [lang, setLang] = useState<"ja" | "vi">("ja");
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [validationError, setValidationError] = useState("");

  // 製品マスタ関連のstate
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showProductDeleteConfirm, setShowProductDeleteConfirm] = useState(false);
  const [deleteProductTargetId, setDeleteProductTargetId] = useState<string | null>(null);
  const [productValidationError, setProductValidationError] = useState("");
  const [productSearchQuery, setProductSearchQuery] = useState("");
  const [productFilterCategory, setProductFilterCategory] = useState("all");

  // 発注品目マスタ関連のstate
  const [showPurchaseItemModal, setShowPurchaseItemModal] = useState(false);
  const [editingPurchaseItem, setEditingPurchaseItem] = useState<PurchaseItem | null>(null);
  const [showPurchaseItemDeleteConfirm, setShowPurchaseItemDeleteConfirm] = useState(false);
  const [deletePurchaseItemTargetId, setDeletePurchaseItemTargetId] = useState<string | null>(null);
  const [purchaseItemValidationError, setPurchaseItemValidationError] = useState("");
  const [purchaseItemSearchQuery, setPurchaseItemSearchQuery] = useState("");
  const [purchaseItemFilterCategory, setPurchaseItemFilterCategory] = useState("all");

  const [showOrderModal, setShowOrderModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [showOrderDeleteConfirm, setShowOrderDeleteConfirm] = useState(false);
  const [deleteOrderTargetId, setDeleteOrderTargetId] = useState<string>("");
  const [orderValidationError, setOrderValidationError] = useState("");
  const [orderSearchQuery, setOrderSearchQuery] = useState("");
  const [orderFilterStatus, setOrderFilterStatus] = useState("all");

  // 売上関連のstate
  const [showSaleModal, setShowSaleModal] = useState(false);
  const [editingSale, setEditingSale] = useState<Sale | null>(null);
  const [showSaleDeleteConfirm, setShowSaleDeleteConfirm] = useState(false);
  const [deleteSaleTargetId, setDeleteSaleTargetId] = useState<string>("");
  const [saleValidationError, setSaleValidationError] = useState("");
  const [saleSearchQuery, setSaleSearchQuery] = useState("");
  const [saleFilterStatus, setSaleFilterStatus] = useState("all");
  const [saleFilterCustomer, setSaleFilterCustomer] = useState("all");

  // 支払いマスタ関連のstate
  const [showPaymentMasterModal, setShowPaymentMasterModal] = useState(false);
  const [editingPaymentMaster, setEditingPaymentMaster] = useState<PaymentMaster | null>(null);
  const [showPaymentMasterDeleteConfirm, setShowPaymentMasterDeleteConfirm] = useState(false);
  const [deletePaymentMasterTargetId, setDeletePaymentMasterTargetId] = useState<string>("");
  const [paymentMasterValidationError, setPaymentMasterValidationError] = useState("");
  const [paymentMasterSearchQuery, setPaymentMasterSearchQuery] = useState("");
  const [paymentMasterFilterCategory, setPaymentMasterFilterCategory] = useState("all");

  // 支払い実績関連のstate
  const getCurrentYearMonth = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}`;
  };
  const [selectedYearMonth, setSelectedYearMonth] = useState(getCurrentYearMonth()); // デフォルトは当月
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [editingPayment, setEditingPayment] = useState<Payment | null>(null);
  const [showPaymentDeleteConfirm, setShowPaymentDeleteConfirm] = useState(false);
  const [deletePaymentTargetId, setDeletePaymentTargetId] = useState<string>("");
  const [paymentValidationError, setPaymentValidationError] = useState("");
  const [paymentSearchQuery, setPaymentSearchQuery] = useState("");
  const [paymentFilterCategory, setPaymentFilterCategory] = useState("all");

  // 換算レート設定
  const [exchangeRates, setExchangeRates] = useState({
    jpy: 150,
    vnd: 25000,
  });

  // レポート画面関連のstate
  const [reportTab, setReportTab] = useState<"sales" | "purchase" | "financial">("sales");
  const [reportPeriod, setReportPeriod] = useState<"thisMonth" | "lastMonth" | "thisQuarter" | "thisYear" | "custom">("thisMonth");

  // ソート機能用のstate
  type SortConfig = {
    key: string;
    direction: "asc" | "desc";
  } | null;

  const [supplierSortConfig, setSupplierSortConfig] = useState<SortConfig>(null);
  const [productSortConfig, setProductSortConfig] = useState<SortConfig>(null);
  const [purchaseItemSortConfig, setPurchaseItemSortConfig] = useState<SortConfig>(null);
  const [orderSortConfig, setOrderSortConfig] = useState<SortConfig>(null);
  const [saleSortConfig, setSaleSortConfig] = useState<SortConfig>(null);
  const [paymentSortConfig, setPaymentSortConfig] = useState<SortConfig>(null);
  const [paymentMasterSortConfig, setPaymentMasterSortConfig] = useState<SortConfig>(null);

  // 汎用ソート関数
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sortData = <T extends Record<string, any>>(data: T[], sortConfig: SortConfig): T[] => {
    if (!sortConfig) return data;

    const sortedData = [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue === bValue) return 0;

      // 数値の場合
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
      }

      // 文字列の場合
      const aStr = String(aValue).toLowerCase();
      const bStr = String(bValue).toLowerCase();

      if (sortConfig.direction === "asc") {
        return aStr < bStr ? -1 : 1;
      } else {
        return aStr > bStr ? -1 : 1;
      }
    });

    return sortedData;
  };

  // ソートヘッダークリックハンドラー
  const handleSort = (key: string, currentConfig: SortConfig, setConfig: (config: SortConfig) => void) => {
    let direction: "asc" | "desc" = "asc";
    if (currentConfig && currentConfig.key === key && currentConfig.direction === "asc") {
      direction = "desc";
    }
    setConfig({ key, direction });
  };

  // ソート可能なテーブルヘッダー
  const SortableHeader = ({
    label,
    sortKey,
    currentConfig,
    onClick,
  }: {
    label: string;
    sortKey: string;
    currentConfig: SortConfig;
    onClick: () => void;
  }) => {
    const isActive = currentConfig?.key === sortKey;
    const direction = isActive ? currentConfig.direction : null;

    return (
      <th
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 select-none whitespace-nowrap"
        onClick={onClick}
      >
        <div className="flex items-center gap-1">
          {label}
          <span className="text-gray-400">
            {!isActive && "⇅"}
            {isActive && direction === "asc" && "↑"}
            {isActive && direction === "desc" && "↓"}
          </span>
        </div>
      </th>
    );
  };

  // アクティビティ追跡
  interface Activity {
    id: number;
    action: string;
    details: string;
    user: string;
    time: string;
    icon: typeof CheckCircle;
    color: string;
  }

  const [activities, setActivities] = useState<Activity[]>([
    {
      id: 1,
      action: "発注が承認されました",
      details: "Saigon Materials - 添加剤 200kg",
      user: "Huong",
      time: "10分前",
      icon: CheckCircle,
      color: "text-green-500",
    },
    {
      id: 2,
      action: "新規取引先が追加されました",
      details: "Hanoi Plastics Co., Ltd.",
      user: "Thanh",
      time: "1時間前",
      icon: Users,
      color: "text-blue-500",
    },
    {
      id: 3,
      action: "売上が計上されました",
      details: "リケン - $32,000",
      user: "Huong",
      time: "2時間前",
      icon: TrendingUp,
      color: "text-purple-500",
    },
    {
      id: 4,
      action: "支払が完了しました",
      details: "Vietnam Plastics Ltd. - $18,000",
      user: "Thanh",
      time: "3時間前",
      icon: CheckCircle,
      color: "text-green-500",
    },
  ]);

  // アクティビティを追加する関数
  const addActivity = (action: string, details: string, icon: typeof CheckCircle, color: string) => {
    const newActivity: Activity = {
      id: activities.length > 0 ? Math.max(...activities.map((a) => a.id)) + 1 : 1,
      action,
      details,
      user: "システム",
      time: "たった今",
      icon,
      color,
    };
    setActivities([newActivity, ...activities].slice(0, 10)); // 最新10件のみ保持
  };

  const translations = {
    ja: {
      dashboard: "ダッシュボード",
      suppliers: "取引先マスタ",
      products: "製品マスタ",
      orders: "発注登録",
      sales: "受注管理",
      payments: "支払管理",
      reports: "レポート",
      settings: "設定",
      systemSettings: "各種設定",
      logout: "ログアウト",
      exchangeRateSettings: "換算レート設定",
      jpyRate: "JPY → USD レート",
      vndRate: "VND → USD レート",
      rateDescription: "1 USD あたりの金額を入力してください",
      welcome: "おかえりなさい",
      todayTasks: "本日のタスク",
      recentActivity: "最近のアクティビティ",
      quickActions: "クイックアクション",
      pendingApproval: "承認待ち",
      duePayments: "支払予定",
      lowStock: "在庫アラート",
      newOrders: "新規発注",
      totalSales: "今月の売上",
      totalPurchase: "今月の仕入",
      monthlyPaymentAmount: "今月の支払",
      monthlyOrderCount: "今月の発注件数",
      pendingDeliveries: "今月の未納入件数",
      viewAll: "すべて表示",
      createNew: "新規作成",
      approve: "承認する",
      view: "詳細",
      salesByCustomer: "顧客別売上",
      purchaseBySupplier: "仕入先別購買額",
      cashFlow: "資金繰り推移",
      alerts: "アラート",
      supplierMaster: "取引先マスタ",
      supplierList: "取引先一覧",
      addSupplier: "新規登録",
      editSupplier: "取引先編集",
      search: "検索",
      export: "エクスポート",
      import: "インポート",
      supplierName: "取引先名",
      type: "区分",
      region: "地域",
      currency: "通貨",
      paymentTerms: "支払条件",
      status: "ステータス",
      actions: "操作",
      deleteAction: "削除",
      active: "有効",
      inactive: "無効",
      save: "保存",
      cancel: "キャンセル",
      delete: "削除",
      edit: "編集",
      confirmDelete: "本当に削除しますか？",
      all: "すべて",
      material: "材料",
      processing: "加工",
      logistics: "物流",
      customer: "顧客",
      other: "その他",
      vietnam: "ベトナム",
      japan: "日本",
      thailand: "タイ",
      china: "中国",
      monthEnd: "月末",
      upon7Days: "着後7日",
      upon14Days: "着後14日",
      upon30Days: "着後30日",
      remarks: "備考",
      totalSuppliers: "登録件数",
      activeSuppliers: "有効",
      inactiveSuppliers: "無効",
      panasonic: "パナソニック",
      riken: "リケン",
      nidec: "ニデック",
      morimura: "森村商事",
      orderMaster: "発注管理",
      orderList: "発注一覧",
      addOrder: "新規発注",
      editOrder: "発注編集",
      orderDate: "発注日",
      supplier: "仕入先",
      deliveryDate: "納品予定日",
      product: "品目/品番",
      quantity: "数量",
      unitPrice: "単価",
      amount: "金額",
      totalAmount: "合計金額",
      ordered: "発注済み",
      delivered: "納品済み",
      cancelled: "キャンセル",
      totalOrders: "発注件数",
      pendingOrders: "発注済み",
      deliveredOrders: "納品済み",
      saleMaster: "受注管理",
      saleList: "受注一覧",
      addSale: "新規受注",
      editSale: "受注編集",
      saleDate: "受注日",
      customerName: "顧客名",
      pending: "未出荷",
      shipped: "出荷済み",
      totalSalesCount: "受注件数",
      pendingSales: "未出荷",
      shippedSales: "出荷済み",
      deliveredSales: "納品済み",
      usa: "米国",
      deleteConfirmTitle: "削除の確認",
      deleteConfirmMessage: "本当に削除しますか?この操作は取り消せません。",
      purchaseItemMasterMenu: "材料マスタ",
      purchaseItemMaster: "材料マスタ",
      purchaseItemList: "材料一覧",
      addPurchaseItem: "新規材料",
      editPurchaseItem: "材料編集",
      productMasterMenu: "製品マスタ",
      productMaster: "製品マスタ",
      productList: "製品一覧",
      addProduct: "新規製品",
      editProduct: "製品編集",
      productCode: "品番",
      productName: "品目名",
      productCategory: "カテゴリ",
      unit: "単位",
      standardPrice: "標準単価",
      totalProducts: "登録製品数",
      activeProducts: "有効",
      inactiveProducts: "無効",
      raw_material: "原材料",
      finished_goods: "完成品",
      semi_finished: "半製品",
      parts: "部品",
      kg: "kg",
      ton: "トン",
      piece: "個",
      box: "箱",
      liter: "リットル",
      meter: "メートル",
      productMasterTitle: "製品マスタ管理",
      productMasterList: "製品マスタ一覧",
      addProductMaster: "新規品目登録",
      editProductMaster: "品目編集",
      totalProductMasters: "品目件数",
      materials: "使用材料",
      weight: "重量",
      weightUnit: "g",
      lengthField: "長さ",
      lengthUnit: "mm",
      speed: "分速",
      speedUnit: "m/min",
      selectMaterials: "材料を選択",
      poNumber: "PO No.",
      orderQuantity: "注数",
      requiredMaterialAmount: "必要材料量",
      requiredMaterialUnit: "kg",
      moldingTime: "成形時間",
      timeUnit: "時間",
      paymentMasterMenu: "支払マスタ",
      paymentMasterTitle: "支払マスタ管理",
      paymentMasterList: "支払マスタ一覧",
      addPaymentMaster: "新規マスタ登録",
      editPaymentMaster: "マスタ編集",
      paymentManagement: "支払管理",
      paymentList: "支払一覧",
      addPayment: "新規支払",
      editPayment: "支払編集",
      selectYearMonth: "対象年月",
      generatePayments: "支払データ生成",
      paymentDate: "支払日",
      paymentDay: "支払日",
      category: "カテゴリ",
      description: "内容",
      paymentMethod: "支払方法",
      rent: "家賃",
      utilities: "光熱費",
      salary: "給与",
      bank: "銀行振込",
      cash: "現金",
      card: "カード",
      paid: "支払済み",
      fixedCost: "固定費",
      variableCost: "変動費",
      fixedAmount: "固定金額",
      totalPayments: "支払件数",
      paidPayments: "支払済み",
      pendingPayments: "未払い",
      paymentStatusPaid: "支払済み",
      paymentStatusPending: "未払い",
      totalPaymentMasters: "マスタ件数",
      reportTitle: "レポート",
      salesReport: "売上レポート",
      purchaseReport: "仕入レポート",
      financialReport: "財務レポート",
      periodSelection: "期間選択",
      startDate: "開始日",
      endDate: "終了日",
      thisMonth: "今月",
      lastMonth: "先月",
      thisQuarter: "今四半期",
      thisYear: "今年",
      customPeriod: "カスタム期間",
      applyFilter: "適用",
      salesTrend: "売上推移",
      salesByProduct: "製品別売上",
      salesByRegion: "地域別売上",
      topCustomers: "上位顧客",
      purchaseTrend: "仕入推移",
      purchaseBySupplierReport: "仕入先別仕入",
      purchaseByCategory: "カテゴリ別仕入",
      deliveryStatus: "納品状況",
      profitLoss: "損益概算",
      revenue: "売上",
      cost: "仕入",
      profit: "利益",
      profitMargin: "利益率",
      paymentStatusReport: "支払状況",
      cashFlowSummary: "キャッシュフロー概要",
      rank: "順位",
      salesAmount: "売上金額",
      purchaseAmount: "仕入金額",
      count: "件数",
      percentage: "割合",
    },
    vi: {
      dashboard: "Bảng điều khiển",
      suppliers: "Nhà cung cấp",
      products: "Sản phẩm",
      orders: "Đặt hàng",
      sales: "Đơn đặt hàng",
      payments: "Thanh toán",
      reports: "Báo cáo",
      settings: "Cài đặt",
      systemSettings: "Cài đặt hệ thống",
      logout: "Đăng xuất",
      exchangeRateSettings: "Cài đặt tỷ giá",
      jpyRate: "Tỷ giá JPY → USD",
      vndRate: "Tỷ giá VND → USD",
      rateDescription: "Nhập số tiền tương đương với 1 USD",
      welcome: "Chào mừng trở lại",
      todayTasks: "Nhiệm vụ hôm nay",
      recentActivity: "Hoạt động gần đây",
      quickActions: "Hành động nhanh",
      pendingApproval: "Chờ phê duyệt",
      duePayments: "Thanh toán đến hạn",
      lowStock: "Cảnh báo tồn kho",
      newOrders: "Đơn hàng mới",
      totalSales: "Doanh thu tháng",
      totalPurchase: "Mua hàng tháng",
      monthlyPaymentAmount: "Thanh toán tháng",
      monthlyOrderCount: "Số đơn hàng tháng",
      pendingDeliveries: "Chưa giao hàng",
      viewAll: "Xem tất cả",
      createNew: "Tạo mới",
      approve: "Phê duyệt",
      view: "Chi tiết",
      salesByCustomer: "Doanh thu theo khách hàng",
      purchaseBySupplier: "Mua hàng theo nhà cung cấp",
      cashFlow: "Dòng tiền",
      alerts: "Cảnh báo",
      supplierMaster: "Quản lý nhà cung cấp",
      supplierList: "Danh sách nhà cung cấp",
      addSupplier: "Thêm mới",
      editSupplier: "Chỉnh sửa nhà cung cấp",
      search: "Tìm kiếm",
      export: "Xuất",
      import: "Nhập",
      supplierName: "Tên đối tác",
      type: "Phân loại",
      region: "Khu vực",
      currency: "Tiền tệ",
      paymentTerms: "Điều khoản thanh toán",
      status: "Trạng thái",
      actions: "Thao tác",
      deleteAction: "Xóa",
      active: "Hoạt động",
      inactive: "Không hoạt động",
      save: "Lưu",
      cancel: "Hủy",
      delete: "Xóa",
      edit: "Sửa",
      confirmDelete: "Bạn có chắc muốn xóa?",
      all: "Tất cả",
      material: "Nguyên liệu",
      processing: "Gia công",
      logistics: "Vận chuyển",
      customer: "Khách hàng",
      other: "Khác",
      vietnam: "Việt Nam",
      japan: "Nhật Bản",
      thailand: "Thái Lan",
      china: "Trung Quốc",
      monthEnd: "Cuối tháng",
      upon7Days: "Sau 7 ngày",
      upon14Days: "Sau 14 ngày",
      upon30Days: "Sau 30 ngày",
      remarks: "Ghi chú",
      totalSuppliers: "Tổng số",
      activeSuppliers: "Hoạt động",
      inactiveSuppliers: "Không hoạt động",
      panasonic: "Panasonic",
      riken: "Riken",
      nidec: "Nidec",
      morimura: "Morimura",
      supplier: "Nhà cung cấp",
      orderMaster: "Quản lý đặt hàng",
      orderList: "Danh sách đơn hàng",
      addOrder: "Đặt hàng mới",
      editOrder: "Chỉnh sửa đơn hàng",
      orderDate: "Ngày đặt hàng",
      deliveryDate: "Ngày giao hàng",
      product: "Sản phẩm/Mã",
      quantity: "Số lượng",
      unitPrice: "Đơn giá",
      amount: "Số tiền",
      totalAmount: "Tổng tiền",
      ordered: "Đã đặt hàng",
      delivered: "Đã giao hàng",
      cancelled: "Đã hủy",
      totalOrders: "Tổng đơn hàng",
      pendingOrders: "Đã đặt hàng",
      deliveredOrders: "Đã giao hàng",
      saleMaster: "Quản lý đơn hàng",
      saleList: "Danh sách đơn hàng",
      addSale: "Đơn hàng mới",
      editSale: "Chỉnh sửa đơn hàng",
      saleDate: "Ngày nhận đơn",
      customerName: "Tên khách hàng",
      pending: "Chưa giao",
      shipped: "Đã xuất",
      totalSalesCount: "Số đơn hàng",
      pendingSales: "Chưa xuất",
      shippedSales: "Đã xuất",
      deliveredSales: "Đã giao",
      usa: "Mỹ",
      deleteConfirmTitle: "Xác nhận xóa",
      deleteConfirmMessage: "Bạn có chắc muốn xóa? Thao tác này không thể hoàn tác.",
      purchaseItemMasterMenu: "Master nguyên liệu",
      purchaseItemMaster: "Master nguyên liệu",
      purchaseItemList: "Danh sách nguyên liệu",
      addPurchaseItem: "Nguyên liệu mới",
      editPurchaseItem: "Chỉnh sửa nguyên liệu",
      productMasterMenu: "Master sản phẩm",
      productMaster: "Sản phẩm master",
      productList: "Danh sách sản phẩm",
      addProduct: "Sản phẩm mới",
      editProduct: "Chỉnh sửa sản phẩm",
      productCode: "Mã sản phẩm",
      productName: "Tên sản phẩm",
      productCategory: "Danh mục",
      unit: "Đơn vị",
      standardPrice: "Đơn giá chuẩn",
      totalProducts: "Tổng sản phẩm",
      activeProducts: "Hoạt động",
      inactiveProducts: "Không hoạt động",
      raw_material: "Nguyên liệu",
      finished_goods: "Thành phẩm",
      semi_finished: "Bán thành phẩm",
      parts: "Linh kiện",
      kg: "kg",
      ton: "Tấn",
      piece: "Cái",
      box: "Hộp",
      liter: "Lít",
      meter: "Mét",
      productMasterTitle: "Quản lý master sản phẩm",
      productMasterList: "Danh sách master sản phẩm",
      addProductMaster: "Thêm sản phẩm mới",
      editProductMaster: "Chỉnh sửa sản phẩm",
      totalProductMasters: "Tổng số sản phẩm",
      materials: "Vật liệu sử dụng",
      weight: "Trọng lượng",
      weightUnit: "g",
      lengthField: "Chiều dài",
      lengthUnit: "mm",
      speed: "Tốc độ",
      speedUnit: "m/phút",
      selectMaterials: "Chọn vật liệu",
      poNumber: "Số PO",
      orderQuantity: "Số lượng đơn",
      requiredMaterialAmount: "Lượng vật liệu cần",
      requiredMaterialUnit: "kg",
      moldingTime: "Thời gian đúc",
      timeUnit: "giờ",
      paymentMasterMenu: "Master thanh toán",
      paymentMasterTitle: "Quản lý master thanh toán",
      paymentMasterList: "Danh sách master",
      addPaymentMaster: "Thêm master mới",
      editPaymentMaster: "Chỉnh sửa master",
      paymentManagement: "Quản lý thanh toán",
      paymentList: "Danh sách thanh toán",
      addPayment: "Thanh toán mới",
      editPayment: "Chỉnh sửa thanh toán",
      selectYearMonth: "Tháng/Năm",
      generatePayments: "Tạo dữ liệu thanh toán",
      paymentDate: "Ngày thanh toán",
      paymentDay: "Ngày thanh toán",
      category: "Danh mục",
      description: "Mô tả",
      paymentMethod: "Phương thức thanh toán",
      rent: "Tiền thuê",
      utilities: "Tiện ích",
      salary: "Lương",
      bank: "Chuyển khoản",
      cash: "Tiền mặt",
      card: "Thẻ",
      paid: "Đã thanh toán",
      fixedCost: "Chi phí cố định",
      variableCost: "Chi phí biến đổi",
      fixedAmount: "Số tiền cố định",
      totalPayments: "Tổng thanh toán",
      paidPayments: "Đã thanh toán",
      pendingPayments: "Chưa thanh toán",
      paymentStatusPaid: "Đã thanh toán",
      paymentStatusPending: "Chưa thanh toán",
      totalPaymentMasters: "Tổng master",
      reportTitle: "Báo cáo",
      salesReport: "Báo cáo doanh thu",
      purchaseReport: "Báo cáo mua hàng",
      financialReport: "Báo cáo tài chính",
      periodSelection: "Chọn kỳ",
      startDate: "Ngày bắt đầu",
      endDate: "Ngày kết thúc",
      thisMonth: "Tháng này",
      lastMonth: "Tháng trước",
      thisQuarter: "Quý này",
      thisYear: "Năm nay",
      customPeriod: "Kỳ tùy chỉnh",
      applyFilter: "Áp dụng",
      salesTrend: "xu hướng doanh thu",
      salesByProduct: "Doanh thu theo sản phẩm",
      salesByRegion: "Doanh thu theo khu vực",
      topCustomers: "Khách hàng hàng đầu",
      purchaseTrend: "Xu hướng mua hàng",
      purchaseBySupplierReport: "Mua hàng theo nhà cung cấp",
      purchaseByCategory: "Mua hàng theo danh mục",
      deliveryStatus: "Tình trạng giao hàng",
      profitLoss: "Lãi lỗ ước tính",
      revenue: "Doanh thu",
      cost: "Chi phí",
      profit: "Lợi nhuận",
      profitMargin: "Tỷ suất lợi nhuận",
      paymentStatusReport: "Tình trạng thanh toán",
      cashFlowSummary: "Tóm tắt dòng tiền",
      rank: "Xếp hạng",
      salesAmount: "Số tiền doanh thu",
      purchaseAmount: "Số tiền mua hàng",
      count: "Số lượng",
      percentage: "Tỷ lệ",
    },
  };

  const t = translations[lang as keyof typeof translations];

  // type Suppliers = {
  //   id: string;
  //   name: string;
  //   type: "material" | "processing" | "logistics" | "other";
  //   region: string;
  //   currency: string;
  //   paymentTerms: string;
  //   status: string;
  //   remarks: string;
  //   createdAt: string;
  //   updatedAt: string;
  // };
  const [suppliers, setSuppliers] = useState<Supplier[]>([
    {
      id: "s-001",
      incrementalId: 1,
      name: "Nguyen Trading Co., Ltd.",
      type: "material",
      region: "vietnam",
      currency: "USD",
      paymentTerms: "monthEnd",
      status: "active",
      remarks: "PVC材料の主要サプライヤー",
      createdAt: "2024-01-15",
      updatedAt: "2024-11-10",
    },
    {
      id: "s-002",
      incrementalId: 2,
      name: "Vietnam Plastics Ltd.",
      type: "material",
      region: "vietnam",
      currency: "VND",
      paymentTerms: "upon7Days",
      status: "active",
      remarks: "ポリエチレン供給",
      createdAt: "2024-02-20",
      updatedAt: "2024-11-18",
    },
    {
      id: "s-003",
      incrementalId: 3,
      name: "Saigon Processing Co.",
      type: "processing",
      region: "vietnam",
      currency: "USD",
      paymentTerms: "upon14Days",
      status: "active",
      remarks: "外注加工先",
      createdAt: "2024-03-10",
      updatedAt: "2024-10-25",
    },
    {
      id: "s-004",
      incrementalId: 4,
      name: "Hanoi Logistics Service",
      type: "logistics",
      region: "vietnam",
      currency: "VND",
      paymentTerms: "monthEnd",
      status: "active",
      remarks: "国内物流",
      createdAt: "2024-04-05",
      updatedAt: "2024-11-15",
    },
    {
      id: "s-005",
      incrementalId: 5,
      name: "Bangkok Materials Supply",
      type: "material",
      region: "thailand",
      currency: "USD",
      paymentTerms: "upon30Days",
      status: "inactive",
      remarks: "取引停止中",
      createdAt: "2024-05-12",
      updatedAt: "2024-08-20",
    },
    {
      id: "s-006",
      incrementalId: 6,
      name: "パナソニック株式会社",
      type: "customer",
      region: "japan",
      currency: "JPY",
      paymentTerms: "monthEnd",
      status: "active",
      remarks: "主要取引先",
      createdAt: "2024-01-10",
      updatedAt: "2025-11-10",
    },
    {
      id: "s-007",
      incrementalId: 7,
      name: "株式会社リケン",
      type: "customer",
      region: "japan",
      currency: "JPY",
      paymentTerms: "upon30Days",
      status: "active",
      remarks: "自動車部品向け",
      createdAt: "2024-02-15",
      updatedAt: "2025-11-15",
    },
    {
      id: "s-008",
      incrementalId: 8,
      name: "日本電産株式会社",
      type: "customer",
      region: "japan",
      currency: "JPY",
      paymentTerms: "monthEnd",
      status: "active",
      remarks: "モーター部品向け",
      createdAt: "2024-03-20",
      updatedAt: "2025-11-18",
    },
    {
      id: "s-009",
      incrementalId: 9,
      name: "森村商事株式会社",
      type: "customer",
      region: "japan",
      currency: "JPY",
      paymentTerms: "upon14Days",
      status: "active",
      remarks: "商社経由取引",
      createdAt: "2024-04-05",
      updatedAt: "2025-11-12",
    },
  ]);

  const [products, setProducts] = useState<Product[]>([
    {
      id: "p-001",
      incrementalId: 1,
      productCode: "P-001",
      productName: "電子部品A",
      category: "parts",
      unit: "piece",
      standardPrice: 150,
      currency: "USD",
      remarks: "標準電子部品",
      status: "active",
      materialIds: ["pi-001", "pi-002"],
      weight: 50,
      length: 100,
      speed: 0.6,
      createdAt: "2024-01-15",
      updatedAt: "2025-11-20",
    },
    {
      id: "p-002",
      incrementalId: 2,
      productCode: "P-002",
      productName: "プラスチック樹脂",
      category: "raw_material",
      unit: "kg",
      standardPrice: 2.5,
      currency: "USD",
      remarks: "汎用樹脂",
      status: "active",
      materialIds: [],
      weight: 1000,
      length: 0,
      speed: 0,
      createdAt: "2024-02-01",
      updatedAt: "2025-11-18",
    },
    {
      id: "p-003",
      incrementalId: 3,
      productCode: "P-003",
      productName: "添加剤",
      category: "raw_material",
      unit: "kg",
      standardPrice: 5.0,
      currency: "USD",
      remarks: "特殊添加剤",
      status: "active",
      materialIds: [],
      weight: 1000,
      length: 0,
      speed: 0,
      createdAt: "2024-02-10",
      updatedAt: "2025-11-15",
    },
    {
      id: "p-004",
      incrementalId: 4,
      productCode: "P-004",
      productName: "成形品A",
      category: "finished_goods",
      unit: "piece",
      standardPrice: 25,
      currency: "JPY",
      remarks: "完成品",
      status: "active",
      materialIds: ["pi-003"],
      weight: 80,
      length: 150,
      speed: 0.6,
      createdAt: "2024-03-01",
      updatedAt: "2025-11-22",
    },
    {
      id: "p-005",
      incrementalId: 5,
      productCode: "P-005",
      productName: "半製品B",
      category: "semi_finished",
      unit: "piece",
      standardPrice: 15,
      currency: "USD",
      remarks: "中間製品",
      status: "active",
      materialIds: ["pi-001"],
      weight: 60,
      length: 120,
      speed: 0.6,
      createdAt: "2024-03-15",
      updatedAt: "2025-11-19",
    },
  ]);

  const [purchaseItems, setPurchaseItems] = useState<PurchaseItem[]>([
    {
      id: "pi-001",
      incrementalId: 1,
      productCode: "PI-001",
      productName: "鋼材A",
      category: "raw_material",
      unit: "kg",
      standardPrice: 3.5,
      currency: "USD",
      supplierId: "s-001",
      remarks: "発注用鋼材",
      status: "active",
      createdAt: "2024-01-15",
      updatedAt: "2025-11-20",
    },
    {
      id: "pi-002",
      incrementalId: 2,
      productCode: "PI-002",
      productName: "アルミ材",
      category: "raw_material",
      unit: "kg",
      standardPrice: 4.2,
      currency: "USD",
      supplierId: "s-002",
      remarks: "発注用アルミニウム",
      status: "active",
      createdAt: "2024-02-01",
      updatedAt: "2025-11-18",
    },
    {
      id: "pi-003",
      incrementalId: 3,
      productCode: "PI-003",
      productName: "ボルトM8",
      category: "parts",
      unit: "piece",
      standardPrice: 0.5,
      currency: "USD",
      supplierId: "s-001",
      remarks: "標準ボルト",
      status: "active",
      createdAt: "2024-02-10",
      updatedAt: "2025-11-15",
    },
    {
      id: "pi-004",
      incrementalId: 4,
      productCode: "PI-004",
      productName: "包装材料",
      category: "raw_material",
      unit: "box",
      standardPrice: 12,
      currency: "USD",
      supplierId: "s-003",
      remarks: "発注用包装材",
      status: "active",
      createdAt: "2024-03-01",
      updatedAt: "2025-11-22",
    },
    {
      id: "pi-005",
      incrementalId: 5,
      productCode: "PI-005",
      productName: "工具セット",
      category: "parts",
      unit: "piece",
      standardPrice: 85,
      currency: "USD",
      supplierId: "s-002",
      remarks: "発注用工具",
      status: "active",
      createdAt: "2024-03-15",
      updatedAt: "2025-11-19",
    },
  ]);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    type: "material",
    region: "vietnam",
    currency: "USD",
    paymentTerms: "monthEnd",
    status: "active",
    remarks: "",
  });

  const [productFormData, setProductFormData] = useState<ProductFormData>({
    productCode: "",
    productName: "",
    category: "raw_material",
    unit: "kg",
    standardPrice: 0,
    currency: "USD",
    remarks: "",
    status: "active",
    materialIds: [],
    weight: 0,
    length: 0,
    speed: 0,
  });

  const [purchaseItemFormData, setPurchaseItemFormData] = useState<PurchaseItemFormData>({
    productCode: "",
    productName: "",
    category: "raw_material",
    unit: "kg",
    standardPrice: 0,
    currency: "USD",
    supplierId: "",
    remarks: "",
    status: "active",
  });

  const [orders, setOrders] = useState<Order[]>([
    {
      id: "o-001",
      incrementalId: 1,
      orderDate: "2025-11-15",
      supplierId: "s-001",
      productId: "pi-001",
      quantity: 1000,
      unitPrice: 3.5,
      currency: "USD",
      deliveryDate: "2025-11-25",
      remarks: "通常発注",
      ordered: true,
      delivered: false,
      paid: false,
      purchaseOrderSent: true,
      deliveryNoteReceived: false,
      invoiceReceived: false,
    },
    {
      id: "o-002",
      incrementalId: 2,
      orderDate: "2025-11-18",
      supplierId: "s-002",
      productId: "pi-002",
      quantity: 500,
      unitPrice: 4.2,
      currency: "USD",
      deliveryDate: "2025-11-28",
      remarks: "急ぎ",
      ordered: true,
      delivered: false,
      paid: false,
      purchaseOrderSent: false,
      deliveryNoteReceived: false,
      invoiceReceived: false,
    },
    {
      id: "o-003",
      incrementalId: 3,
      orderDate: "2025-11-10",
      supplierId: "s-003",
      productId: "pi-003",
      quantity: 200,
      unitPrice: 0.5,
      currency: "USD",
      deliveryDate: "2025-11-20",
      remarks: "納品完了",
      ordered: true,
      delivered: true,
      paid: true,
      purchaseOrderSent: true,
      deliveryNoteReceived: true,
      invoiceReceived: true,
    },
  ]);

  const [orderFormData, setOrderFormData] = useState<OrderFormData>({
    orderDate: "",
    supplierId: "",
    productId: "",
    quantity: 0,
    unitPrice: 0,
    currency: "USD",
    deliveryDate: "",
    remarks: "",
    ordered: true, // デフォルトでチェック
    delivered: false,
    paid: false,
    purchaseOrderSent: false,
    deliveryNoteReceived: false,
    invoiceReceived: false,
  });

  // 受注データ
  const [sales, setSales] = useState<Sale[]>([
    {
      id: "sl-001",
      incrementalId: 1,
      poNumber: "PO-2025-001",
      saleDate: "2025-11-15",
      customerId: "s-006",
      productId: "p-004",
      quantity: 2000,
      unitPrice: 25,
      currency: "JPY",
      deliveryDate: "2025-11-25",
      remarks: "定期取引",
      materialIds: ["pi-003"], // p-004の使用材料
      requiredMaterialAmount: 160, // 2000 * 80g / 1000 = 160kg
      moldingTime: 8.33, // (2000 * 150mm / 1000) / 0.6m/min / 60 = 8.33時間
      shipped: true,
      delivered: false,
      paid: false,
      purchaseOrderReceived: true,
      deliveryNoteSent: true,
      invoiceSent: false,
    },
    {
      id: "sl-002",
      incrementalId: 2,
      poNumber: "PO-2025-002",
      saleDate: "2025-11-18",
      customerId: "s-007",
      productId: "p-005",
      quantity: 1500,
      unitPrice: 15,
      currency: "USD",
      deliveryDate: "2025-11-28",
      remarks: "急ぎ対応",
      materialIds: ["pi-001"], // p-005の使用材料
      requiredMaterialAmount: 90, // 1500 * 60g / 1000 = 90kg
      moldingTime: 5.00, // (1500 * 120mm / 1000) / 0.6m/min / 60 = 5.00時間
      shipped: false,
      delivered: false,
      paid: false,
      purchaseOrderReceived: true,
      deliveryNoteSent: false,
      invoiceSent: false,
    },
    {
      id: "sl-003",
      incrementalId: 3,
      poNumber: "PO-2025-003",
      saleDate: "2025-11-10",
      customerId: "s-008",
      productId: "p-004",
      quantity: 800,
      unitPrice: 25,
      currency: "JPY",
      deliveryDate: "2025-11-20",
      remarks: "納品完了",
      materialIds: ["pi-003"], // p-004の使用材料
      requiredMaterialAmount: 64, // 800 * 80g / 1000 = 64kg
      moldingTime: 3.33, // (800 * 150mm / 1000) / 0.6m/min / 60 = 3.33時間
      shipped: true,
      delivered: true,
      paid: true,
      purchaseOrderReceived: true,
      deliveryNoteSent: true,
      invoiceSent: true,
    },
  ]);

  const [saleFormData, setSaleFormData] = useState<SaleFormData>({
    poNumber: "",
    saleDate: "",
    customerId: "",
    productId: "",
    quantity: 0,
    unitPrice: 0,
    currency: "JPY",
    deliveryDate: "",
    remarks: "",
    materialIds: [],
    requiredMaterialAmount: 0,
    moldingTime: 0,
    shipped: false,
    delivered: false,
    paid: false,
    purchaseOrderReceived: false,
    deliveryNoteSent: false,
    invoiceSent: false,
  });

  // 支払いマスタデータ（毎月かかる経費のテンプレート）
  const [paymentMasters, setPaymentMasters] = useState<PaymentMaster[]>([
    {
      id: "pmst-001",
      incrementalId: 1,
      category: "rent",
      description: "工場賃料",
      isFixed: true,
      fixedAmount: 500000,
      currency: "JPY",
      paymentMethod: "bank",
      paymentDay: 30, // 毎月30日に支払い
      remarks: "固定費",
    },
    {
      id: "pmst-002",
      incrementalId: 2,
      category: "utilities",
      description: "電気代",
      isFixed: false,
      fixedAmount: 0,
      currency: "JPY",
      paymentMethod: "bank",
      paymentDay: 30,
      remarks: "25日確定、月末支払い",
    },
    {
      id: "pmst-003",
      incrementalId: 3,
      category: "utilities",
      description: "水道代",
      isFixed: false,
      fixedAmount: 0,
      currency: "JPY",
      paymentMethod: "bank",
      paymentDay: 30,
      remarks: "25日確定、月末支払い",
    },
  ]);

  const [paymentMasterFormData, setPaymentMasterFormData] = useState<PaymentMasterFormData>({
    category: "rent",
    description: "",
    isFixed: false,
    fixedAmount: 0,
    currency: "JPY",
    paymentMethod: "bank",
    paymentDay: 30,
    remarks: "",
  });

  // 支払い実績データ（各月の実際の支払い）
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: "pay-001",
      incrementalId: 1,
      masterId: "pmst-001",
      yearMonth: "2025-11",
      paymentDate: "2025-11-30",
      category: "rent",
      description: "工場賃料",
      amount: 500000,
      currency: "JPY",
      paymentMethod: "bank",
      status: "paid",
      isFixed: true,
      remarks: "",
    },
    {
      id: "pay-002",
      incrementalId: 2,
      masterId: "pmst-002",
      yearMonth: "2025-11",
      paymentDate: "2025-11-30",
      category: "utilities",
      description: "電気代",
      amount: 85000,
      currency: "JPY",
      paymentMethod: "bank",
      status: "paid",
      isFixed: false,
      remarks: "",
    },
    {
      id: "pay-003",
      incrementalId: 3,
      masterId: "pmst-003",
      yearMonth: "2025-11",
      paymentDate: "2025-11-30",
      category: "utilities",
      description: "水道代",
      amount: 35000,
      currency: "JPY",
      paymentMethod: "bank",
      status: "paid",
      isFixed: false,
      remarks: "",
    },
  ]);

  const [paymentFormData, setPaymentFormData] = useState<PaymentFormData>({
    category: "rent",
    description: "",
    paymentDate: "",
    amount: 0,
    currency: "JPY",
    paymentMethod: "bank",
    status: "pending",
    remarks: "",
  });

  const salesData = [
    { name: t.panasonic, value: 45000, currency: "USD" },
    { name: t.riken, value: 32000, currency: "USD" },
    { name: t.nidec, value: 28000, currency: "USD" },
    { name: t.morimura, value: 15000, currency: "USD" },
  ];

  // const purchaseData = [
  //   { name: "Nguyen Trading", value: 25000 },
  //   { name: "Vietnam Plastics", value: 18000 },
  //   { name: "Saigon Materials", value: 12000 },
  // ];

  const cashFlowData = [
    { month: "7月", sales: 95000, purchase: 52000, balance: 43000 },
    { month: "8月", sales: 105000, purchase: 58000, balance: 47000 },
    { month: "9月", sales: 115000, purchase: 55000, balance: 60000 },
    { month: "10月", sales: 120000, purchase: 60000, balance: 60000 },
    { month: "11月", sales: 125000, purchase: 55000, balance: 70000 },
  ];

  // TODO: 未払いの光熱費タスクを動的に生成（後で実装）
  // const pendingUtilityPayments = payments.filter(
  //   (p) => p.status === "pending" && p.category === "utilities"
  // );

  // const utilityTasks = pendingUtilityPayments.map((payment, index) => ({
  //   id: 100 + index,
  //   type: "payment",
  //   title: `${payment.description}の登録`,
  //   description: `対象月: ${payment.yearMonth}`,
  //   priority: "medium",
  //   dueDate: "月末",
  //   icon: DollarSign,
  //   color: "text-orange-500",
  // }));

  const tasks = [
    {
      id: 1,
      type: "approval",
      title: "Vietnam Plastics Ltd.からの発注承認",
      description: "ポリエチレン 500kg - 単価変動あり",
      priority: "high",
      dueDate: "本日",
      icon: AlertCircle,
      color: "text-red-500",
    },
    {
      id: 2,
      type: "payment",
      title: "Nguyen Trading Co.への支払",
      description: "$25,000 - 支払期限: 11/22",
      priority: "medium",
      dueDate: "明日",
      icon: DollarSign,
      color: "text-orange-500",
    },
    {
      id: 3,
      type: "order",
      title: "パナソニック向け出荷準備",
      description: "品番: PVC-A123 - 数量: 1,000個",
      priority: "medium",
      dueDate: "11/25",
      icon: Package,
      color: "text-blue-500",
    },
  ];

  const alerts = [
    { id: 1, type: "abnormalPrice", message: "Vietnam Plastics Ltd. - ポリエチレンの単価が前回比13%上昇", severity: "high" as const },
    { id: 2, type: "newSupplier", message: "新規仕入先: Saigon Materials (承認待ち)", severity: "medium" as const },
    { id: 3, type: "overduePayment", message: "Nguyen Trading Co.への支払いが2日遅延", severity: "high" as const },
  ];

  const menuItems = [
    { icon: LayoutDashboard, label: t.dashboard, page: "dashboard" },
    { icon: Users, label: t.suppliers, page: "suppliers" },
    { icon: Package, label: t.purchaseItemMasterMenu, page: "purchaseItemMaster" },
    { icon: ShoppingCart, label: t.orderMaster, page: "orders" },
    { icon: Package, label: t.productMasterMenu, page: "productMaster" },
    { icon: TrendingUp, label: t.saleMaster, page: "sales" },
    { icon: DollarSign, label: t.paymentMasterMenu, page: "paymentMaster" },
    { icon: DollarSign, label: t.paymentManagement, page: "payments" },
    { icon: FileText, label: t.reports, page: "reports" },
    { icon: Settings, label: t.systemSettings, page: "systemSettings" },
  ];

  const quickActions = [
    {
      title: t.orders,
      description: "新しい発注を登録",
      icon: ShoppingCart,
      color: "bg-blue-500",
      page: "orders",
    },
    {
      title: t.sales,
      description: "売上を計上",
      icon: TrendingUp,
      color: "bg-green-500",
      page: "sales",
    },
    {
      title: t.suppliers,
      description: "取引先を管理",
      icon: Users,
      color: "bg-purple-500",
      page: "suppliers",
    },
    {
      title: t.payments,
      description: "支払を処理",
      icon: DollarSign,
      color: "bg-orange-500",
      page: "payments",
    },
  ];

  // 型定義
  interface Supplier {
    id: string;
    incrementalId: number;
    name: string;
    type: "material" | "processing" | "logistics" | "customer" | "other";
    region: "vietnam" | "japan" | "thailand" | "china";
    currency: "USD" | "JPY" | "VND";
    paymentTerms: "monthEnd" | "upon7Days" | "upon14Days" | "upon30Days";
    status: "active" | "inactive";
    remarks: string;
    createdAt: string;
    updatedAt: string;
  }

  interface Product {
    id: string;
    incrementalId: number;
    productCode: string; // 品番
    productName: string; // 品目名
    category: "raw_material" | "finished_goods" | "semi_finished" | "parts" | "other";
    unit: "kg" | "ton" | "piece" | "box" | "liter" | "meter";
    standardPrice: number;
    currency: "USD" | "JPY" | "VND";
    remarks: string;
    status: "active" | "inactive";
    materialIds: string[]; // 使用材料（発注品目マスタのID）
    weight: number; // 重量（g）
    length: number; // 長さ（mm）
    speed: number; // 分速（m/min）
    createdAt: string;
    updatedAt: string;
  }

  interface ProductFormData {
    productCode: string;
    productName: string;
    category: "raw_material" | "finished_goods" | "semi_finished" | "parts" | "other";
    unit: "kg" | "ton" | "piece" | "box" | "liter" | "meter";
    standardPrice: number;
    currency: "USD" | "JPY" | "VND";
    remarks: string;
    status: "active" | "inactive";
    materialIds: string[]; // 使用材料（発注品目マスタのID）
    weight: number; // 重量（g）
    length: number; // 長さ（mm）
    speed: number; // 分速（m/min）
  }

  interface PurchaseItem {
    id: string;
    incrementalId: number;
    productCode: string; // 品番
    productName: string; // 品目名
    category: "raw_material" | "finished_goods" | "semi_finished" | "parts" | "other";
    unit: "kg" | "ton" | "piece" | "box" | "liter" | "meter";
    standardPrice: number;
    currency: "USD" | "JPY" | "VND";
    supplierId: string; // 仕入先ID
    remarks: string;
    status: "active" | "inactive";
    createdAt: string;
    updatedAt: string;
  }

  interface PurchaseItemFormData {
    productCode: string;
    productName: string;
    category: "raw_material" | "finished_goods" | "semi_finished" | "parts" | "other";
    unit: "kg" | "ton" | "piece" | "box" | "liter" | "meter";
    standardPrice: number;
    currency: "USD" | "JPY" | "VND";
    supplierId: string; // 仕入先ID
    remarks: string;
    status: "active" | "inactive";
  }

  interface FormData {
    name: string;
    type: "material" | "processing" | "logistics" | "customer" | "other";
    region: "vietnam" | "japan" | "thailand" | "china";
    currency: "USD" | "JPY" | "VND";
    paymentTerms: "monthEnd" | "upon7Days" | "upon14Days" | "upon30Days";
    status: "active" | "inactive";
    remarks: string;
  }

  // interface SupplierFormData {
  //   name: string;
  //   type: "material" | "processing" | "logistics" | "other";
  //   region: "vietnam" | "japan" | "thailand" | "china";
  //   currency: "USD" | "JPY" | "VND";
  //   paymentTerms: "monthEnd" | "upon7Days" | "upon14Days" | "upon30Days";
  //   status: "active" | "inactive";
  //   remarks: string;
  // }

  const handleOpenModal = (supplier: Supplier | null): void => {
    setValidationError("");
    if (supplier) {
      setEditingSupplier(supplier);
      setFormData({
        name: supplier.name,
        type: supplier.type,
        region: supplier.region,
        currency: supplier.currency,
        paymentTerms: supplier.paymentTerms,
        status: supplier.status,
        remarks: supplier.remarks,
      });
    } else {
      setEditingSupplier(null);
      setFormData({
        name: "",
        type: "material",
        region: "vietnam",
        currency: "USD",
        paymentTerms: "monthEnd",
        status: "active",
        remarks: "",
      });
    }
    setShowModal(true);
  };

  const handleSave = () => {
    // 必須項目のバリデーション
    if (!formData.name || !formData.name.trim()) {
      setValidationError(lang === "ja" ? "仕入先名を入力してください" : "Vui lòng nhập tên nhà cung cấp");
      return;
    }
    if (!formData.type) {
      setValidationError(lang === "ja" ? "区分を選択してください" : "Vui lòng chọn phân loại");
      return;
    }
    if (!formData.region) {
      setValidationError(lang === "ja" ? "地域を選択してください" : "Vui lòng chọn khu vực");
      return;
    }
    if (!formData.currency) {
      setValidationError(lang === "ja" ? "通貨を選択してください" : "Vui lòng chọn tiền tệ");
      return;
    }
    if (!formData.paymentTerms) {
      setValidationError(lang === "ja" ? "支払条件を選択してください" : "Vui lòng chọn điều khoản thanh toán");
      return;
    }

    const incrementalId = suppliers.length > 0 ? Math.max(...suppliers.map((s) => s.incrementalId)) + 1 : 1;
    const id = `s-${String(incrementalId).padStart(3, "0")}`;
    if (editingSupplier) {
      setSuppliers(
        suppliers.map(
          (s) => (s.id === editingSupplier.id ? { ...s, ...formData, updatedAt: new Date().toISOString().split("T")[0] } : s) as Supplier
        )
      );
      addActivity("取引先が更新されました", `${formData.name}`, Edit, "text-blue-500");
    } else {
      const newSupplier = {
        id,
        incrementalId: suppliers.length > 0 ? Math.max(...suppliers.map((s) => s.incrementalId)) + 1 : 1,
        ...formData,
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
      };
      setSuppliers([...suppliers, newSupplier]);
      addActivity("新規取引先が追加されました", `${formData.name}`, Users, "text-green-500");
    }
    setValidationError("");
    setShowModal(false);
  };

  const handleDeleteClick = (id: string): void => {
    setDeleteTargetId(id);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    if (deleteTargetId) {
      const deletedSupplier = suppliers.find((s) => s.id === deleteTargetId);
      setSuppliers(suppliers.filter((s) => s.id !== deleteTargetId));
      if (deletedSupplier) {
        addActivity("取引先が削除されました", `${deletedSupplier.name}`, Trash2, "text-red-500");
      }
      setShowDeleteConfirm(false);
      setDeleteTargetId(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
    setDeleteTargetId(null);
  };

  // 製品マスタ関連の関数
  const handleOpenProductModal = (product: Product | null) => {
    if (product) {
      setEditingProduct(product);
      setProductFormData({
        productCode: product.productCode,
        productName: product.productName,
        category: product.category,
        unit: product.unit,
        standardPrice: product.standardPrice,
        currency: product.currency,
        remarks: product.remarks,
        status: product.status,
        materialIds: product.materialIds,
        weight: product.weight,
        length: product.length,
        speed: product.speed,
      });
    } else {
      setEditingProduct(null);
      setProductFormData({
        productCode: "",
        productName: "",
        category: "raw_material",
        unit: "kg",
        standardPrice: 0,
        currency: "USD",
        remarks: "",
        status: "active",
        materialIds: [],
        weight: 0,
        length: 0,
        speed: 0,
      });
    }
    setProductValidationError("");
    setShowProductModal(true);
  };

  const handleProductSave = () => {
    if (!productFormData.productCode.trim() || !productFormData.productName.trim()) {
      setProductValidationError(lang === "ja" ? "品番と品目名は必須です" : "Mã sản phẩm và tên sản phẩm là bắt buộc");
      return;
    }

    if (editingProduct) {
      const updatedProduct = {
        ...editingProduct,
        ...productFormData,
        updatedAt: new Date().toISOString().split("T")[0],
      };
      setProducts(products.map((p) => (p.id === editingProduct.id ? updatedProduct : p)));
      addActivity("製品が更新されました", `${productFormData.productCode} - ${productFormData.productName}`, Package, "text-blue-500");
    } else {
      const id = `p-${Date.now()}`;
      const newProduct = {
        id,
        incrementalId: products.length > 0 ? Math.max(...products.map((p) => p.incrementalId)) + 1 : 1,
        ...productFormData,
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
      };
      setProducts([...products, newProduct]);
      addActivity("新規製品が追加されました", `${productFormData.productCode} - ${productFormData.productName}`, Package, "text-green-500");
    }
    setProductValidationError("");
    setShowProductModal(false);
  };

  const handleProductDeleteClick = (id: string): void => {
    setDeleteProductTargetId(id);
    setShowProductDeleteConfirm(true);
  };

  const handleProductDeleteConfirm = () => {
    if (deleteProductTargetId) {
      const deletedProduct = products.find((p) => p.id === deleteProductTargetId);
      setProducts(products.filter((p) => p.id !== deleteProductTargetId));
      if (deletedProduct) {
        addActivity("製品が削除されました", `${deletedProduct.productCode} - ${deletedProduct.productName}`, Trash2, "text-red-500");
      }
      setShowProductDeleteConfirm(false);
      setDeleteProductTargetId(null);
    }
  };

  const handleProductDeleteCancel = () => {
    setShowProductDeleteConfirm(false);
    setDeleteProductTargetId(null);
  };

  // 発注品目マスタ関連の関数
  const handleOpenPurchaseItemModal = (purchaseItem: PurchaseItem | null) => {
    if (purchaseItem) {
      setEditingPurchaseItem(purchaseItem);
      setPurchaseItemFormData({
        productCode: purchaseItem.productCode,
        productName: purchaseItem.productName,
        category: purchaseItem.category,
        unit: purchaseItem.unit,
        standardPrice: purchaseItem.standardPrice,
        currency: purchaseItem.currency,
        supplierId: purchaseItem.supplierId,
        remarks: purchaseItem.remarks,
        status: purchaseItem.status,
      });
    } else {
      setEditingPurchaseItem(null);
      setPurchaseItemFormData({
        productCode: "",
        productName: "",
        category: "raw_material",
        unit: "kg",
        standardPrice: 0,
        currency: "USD",
        supplierId: "",
        remarks: "",
        status: "active",
      });
    }
    setPurchaseItemValidationError("");
    setShowPurchaseItemModal(true);
  };

  const handlePurchaseItemSave = () => {
    if (!purchaseItemFormData.productCode.trim() || !purchaseItemFormData.productName.trim()) {
      setPurchaseItemValidationError(lang === "ja" ? "品番と品目名は必須です" : "Mã sản phẩm và tên sản phẩm là bắt buộc");
      return;
    }

    if (editingPurchaseItem) {
      const updatedPurchaseItem = {
        ...editingPurchaseItem,
        ...purchaseItemFormData,
        updatedAt: new Date().toISOString().split("T")[0],
      };
      setPurchaseItems(purchaseItems.map((p) => (p.id === editingPurchaseItem.id ? updatedPurchaseItem : p)));
      addActivity(
        "発注品目が更新されました",
        `${purchaseItemFormData.productCode} - ${purchaseItemFormData.productName}`,
        Package,
        "text-blue-500"
      );
    } else {
      const id = `pi-${Date.now()}`;
      const newPurchaseItem = {
        id,
        incrementalId: purchaseItems.length > 0 ? Math.max(...purchaseItems.map((p) => p.incrementalId)) + 1 : 1,
        ...purchaseItemFormData,
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
      };
      setPurchaseItems([...purchaseItems, newPurchaseItem]);
      addActivity(
        "新規発注品目が追加されました",
        `${purchaseItemFormData.productCode} - ${purchaseItemFormData.productName}`,
        Package,
        "text-green-500"
      );
    }
    setPurchaseItemValidationError("");
    setShowPurchaseItemModal(false);
  };

  const handlePurchaseItemDeleteClick = (id: string): void => {
    setDeletePurchaseItemTargetId(id);
    setShowPurchaseItemDeleteConfirm(true);
  };

  const handlePurchaseItemDeleteConfirm = () => {
    if (deletePurchaseItemTargetId) {
      const deletedPurchaseItem = purchaseItems.find((p) => p.id === deletePurchaseItemTargetId);
      setPurchaseItems(purchaseItems.filter((p) => p.id !== deletePurchaseItemTargetId));
      if (deletedPurchaseItem) {
        addActivity(
          "発注品目が削除されました",
          `${deletedPurchaseItem.productCode} - ${deletedPurchaseItem.productName}`,
          Trash2,
          "text-red-500"
        );
      }
      setShowPurchaseItemDeleteConfirm(false);
      setDeletePurchaseItemTargetId(null);
    }
  };

  const handlePurchaseItemDeleteCancel = () => {
    setShowPurchaseItemDeleteConfirm(false);
    setDeletePurchaseItemTargetId(null);
  };

  // 発注関連の関数
  // 発注関連の型定義
  interface Order {
    id: string;
    incrementalId: number;
    orderDate: string;
    supplierId: string;
    productId: string;
    quantity: number;
    unitPrice: number;
    currency: "USD" | "JPY" | "VND";
    deliveryDate: string;
    remarks: string;
    // ステータス（チェックボックス）
    ordered: boolean; // 発注済み
    delivered: boolean; // 納品済み
    paid: boolean; // 支払い済み
    // 書類ステータス
    purchaseOrderSent: boolean; // 発注書送付
    deliveryNoteReceived: boolean; // 納品書受領
    invoiceReceived: boolean; // 請求書受領
  }

  interface OrderFormData {
    orderDate: string;
    supplierId: string;
    productId: string;
    quantity: number;
    unitPrice: number;
    currency: "USD" | "JPY" | "VND";
    deliveryDate: string;
    remarks: string;
    // ステータス（チェックボックス）
    ordered: boolean;
    delivered: boolean;
    paid: boolean;
    // 書類ステータス
    purchaseOrderSent: boolean;
    deliveryNoteReceived: boolean;
    invoiceReceived: boolean;
  }

  interface Sale {
    id: string;
    incrementalId: number;
    poNumber: string; // PO No. (Purchase Order Number)
    saleDate: string; // 売上日（旧：受注日）
    customerId: string;
    productId: string;
    quantity: number; // 注数（旧：数量）
    unitPrice: number;
    currency: "USD" | "JPY" | "VND";
    deliveryDate: string;
    remarks: string;
    // 自動計算項目
    materialIds: string[]; // 使用材料（製品マスタから自動入力）
    requiredMaterialAmount: number; // 必要材料量（数量 * 重量）
    moldingTime: number; // 成形時間（（数量 * 長さ）/ 分速）
    // ステータス（チェックボックス）
    shipped: boolean; // 出荷済み
    delivered: boolean; // 納品済み
    paid: boolean; // 入金済み
    // 書類ステータス
    purchaseOrderReceived: boolean; // 発注書受領
    deliveryNoteSent: boolean; // 納品書送付
    invoiceSent: boolean; // 請求書送付
  }

  interface SaleFormData {
    poNumber: string; // PO No.
    saleDate: string; // 売上日
    customerId: string;
    productId: string;
    quantity: number; // 注数
    unitPrice: number;
    currency: "USD" | "JPY" | "VND";
    deliveryDate: string;
    remarks: string;
    // 自動計算項目（表示のみ）
    materialIds: string[];
    requiredMaterialAmount: number;
    moldingTime: number;
    // ステータス（チェックボックス）
    shipped: boolean;
    delivered: boolean;
    paid: boolean;
    // 書類ステータス
    purchaseOrderReceived: boolean;
    deliveryNoteSent: boolean;
    invoiceSent: boolean;
  }

  // 支払いマスタ（毎月かかる経費のテンプレート）
  interface PaymentMaster {
    id: string;
    incrementalId: number;
    category: "rent" | "utilities" | "salary" | "other";
    description: string;
    isFixed: boolean; // 固定費かどうか
    fixedAmount: number; // 固定費の場合の金額（変動費の場合は0）
    currency: "USD" | "JPY" | "VND";
    paymentMethod: "bank" | "cash" | "card";
    paymentDay: number; // 支払日（毎月何日に支払うか）
    remarks: string;
  }

  interface PaymentMasterFormData {
    category: "rent" | "utilities" | "salary" | "other";
    description: string;
    isFixed: boolean;
    fixedAmount: number;
    currency: "USD" | "JPY" | "VND";
    paymentMethod: "bank" | "cash" | "card";
    paymentDay: number;
    remarks: string;
  }

  // 支払い実績（各月の実際の支払いデータ）
  interface Payment {
    id: string;
    incrementalId: number;
    masterId: string; // 支払いマスタのID
    yearMonth: string; // 対象年月（YYYY-MM形式）
    paymentDate: string; // 実際の支払日
    category: "rent" | "utilities" | "salary" | "other";
    description: string;
    amount: number; // 実際の支払額
    currency: "USD" | "JPY" | "VND";
    paymentMethod: "bank" | "cash" | "card";
    status: "pending" | "paid"; // ステータスは2択
    isFixed: boolean;
    remarks: string;
  }

  interface PaymentFormData {
    category: "rent" | "utilities" | "salary" | "other";
    description: string;
    paymentDate: string;
    amount: number;
    currency: "USD" | "JPY" | "VND";
    paymentMethod: "bank" | "cash" | "card";
    status: "pending" | "paid";
    remarks: string;
  }

  const handleOpenOrderModal = (order: Order | null): void => {
    setOrderValidationError("");
    if (order) {
      setEditingOrder(order);
      setOrderFormData({
        orderDate: order.orderDate,
        supplierId: order.supplierId.toString(),
        productId: order.productId,
        quantity: order.quantity,
        unitPrice: order.unitPrice,
        currency: order.currency,
        deliveryDate: order.deliveryDate,
        remarks: order.remarks,
        ordered: order.ordered,
        delivered: order.delivered,
        paid: order.paid,
        purchaseOrderSent: order.purchaseOrderSent,
        deliveryNoteReceived: order.deliveryNoteReceived,
        invoiceReceived: order.invoiceReceived,
      });
    } else {
      setEditingOrder(null);
      const today = new Date().toISOString().split("T")[0];
      setOrderFormData({
        orderDate: today,
        supplierId: "",
        productId: "",
        quantity: 0,
        unitPrice: 0,
        currency: "USD",
        deliveryDate: "",
        remarks: "",
        ordered: true, // デフォルトでチェック
        delivered: false,
        paid: false,
        purchaseOrderSent: false,
        deliveryNoteReceived: false,
        invoiceReceived: false,
      });
    }
    setShowOrderModal(true);
  };

  const handleOrderSave = () => {
    // 必須項目のバリデーション
    if (!orderFormData.orderDate) {
      setOrderValidationError(lang === "ja" ? "発注日を入力してください" : "Vui lòng nhập ngày đặt hàng");
      return;
    }
    if (!orderFormData.supplierId) {
      setOrderValidationError(lang === "ja" ? "仕入先を選択してください" : "Vui lòng chọn nhà cung cấp");
      return;
    }
    if (!orderFormData.productId) {
      setOrderValidationError(lang === "ja" ? "製品を選択してください" : "Vui lòng chọn sản phẩm");
      return;
    }
    if (!orderFormData.quantity || orderFormData.quantity <= 0) {
      setOrderValidationError(lang === "ja" ? "数量を正しく入力してください" : "Vui lòng nhập số lượng chính xác");
      return;
    }
    if (!orderFormData.unitPrice || orderFormData.unitPrice <= 0) {
      setOrderValidationError(lang === "ja" ? "単価を正しく入力してください" : "Vui lòng nhập đơn giá chính xác");
      return;
    }
    if (!orderFormData.deliveryDate) {
      setOrderValidationError(lang === "ja" ? "納品予定日を入力してください" : "Vui lòng nhập ngày giao hàng");
      return;
    }

    const orderData = {
      orderDate: orderFormData.orderDate,
      supplierId: orderFormData.supplierId,
      productId: orderFormData.productId,
      quantity: Number(orderFormData.quantity),
      unitPrice: Number(orderFormData.unitPrice),
      currency: orderFormData.currency,
      deliveryDate: orderFormData.deliveryDate,
      remarks: orderFormData.remarks,
      ordered: orderFormData.ordered,
      delivered: orderFormData.delivered,
      paid: orderFormData.paid,
      purchaseOrderSent: orderFormData.purchaseOrderSent,
      deliveryNoteReceived: orderFormData.deliveryNoteReceived,
      invoiceReceived: orderFormData.invoiceReceived,
    };

    const incrementalId = orders.length > 0 ? Math.max(...orders.map((o) => o.incrementalId)) + 1 : 1;
    if (editingOrder) {
      setOrders(orders.map((o) => (o.id === editingOrder.id ? { ...o, ...orderData } : o)));
      const supplier = suppliers.find((s) => s.id === orderFormData.supplierId);
      const purchaseItem = purchaseItems.find((p) => p.id === orderFormData.productId);
      addActivity("発注が更新されました", `${supplier?.name || "取引先"} - ${purchaseItem?.productName || "品目"}`, Edit, "text-blue-500");
    } else {
      const newOrder = {
        id: `o-${String(incrementalId).padStart(3, "0")}`,
        incrementalId,
        ...orderData,
      };
      setOrders([...orders, newOrder]);
      const supplier = suppliers.find((s) => s.id === orderFormData.supplierId);
      const purchaseItem = purchaseItems.find((p) => p.id === orderFormData.productId);
      addActivity(
        "新規発注が登録されました",
        `${supplier?.name || "取引先"} - ${purchaseItem?.productName || "品目"}`,
        ShoppingCart,
        "text-green-500"
      );
    }
    setOrderValidationError("");
    setShowOrderModal(false);
  };

  const handleOrderDeleteClick = (id: string) => {
    setDeleteOrderTargetId(id);
    setShowOrderDeleteConfirm(true);
  };

  const handleOrderDeleteConfirm = () => {
    if (deleteOrderTargetId) {
      const deletedOrder = orders.find((o) => o.id === deleteOrderTargetId);
      setOrders(orders.filter((o) => o.id !== deleteOrderTargetId));
      if (deletedOrder) {
        const supplier = suppliers.find((s) => s.id === deletedOrder.supplierId);
        const purchaseItem = purchaseItems.find((p) => p.id === deletedOrder.productId);
        addActivity(
          "発注が削除されました",
          `${supplier?.name || "取引先"} - ${purchaseItem?.productName || "品目"}`,
          Trash2,
          "text-red-500"
        );
      }
      setShowOrderDeleteConfirm(false);
      setDeleteOrderTargetId("");
    }
  };

  const handleOrderDeleteCancel = () => {
    setShowOrderDeleteConfirm(false);
    setDeleteOrderTargetId("");
  };

  // 売上関連の関数
  const handleOpenSaleModal = (sale: Sale | null): void => {
    setSaleValidationError("");
    if (sale) {
      setEditingSale(sale);
      setSaleFormData({
        poNumber: sale.poNumber,
        saleDate: sale.saleDate,
        customerId: sale.customerId.toString(),
        productId: sale.productId,
        quantity: sale.quantity,
        unitPrice: sale.unitPrice,
        currency: sale.currency,
        deliveryDate: sale.deliveryDate,
        remarks: sale.remarks,
        materialIds: sale.materialIds,
        requiredMaterialAmount: sale.requiredMaterialAmount,
        moldingTime: sale.moldingTime,
        shipped: sale.shipped,
        delivered: sale.delivered,
        paid: sale.paid,
        purchaseOrderReceived: sale.purchaseOrderReceived,
        deliveryNoteSent: sale.deliveryNoteSent,
        invoiceSent: sale.invoiceSent,
      });
    } else {
      setEditingSale(null);
      const today = new Date().toISOString().split("T")[0];
      setSaleFormData({
        poNumber: "",
        saleDate: today,
        customerId: "",
        productId: "",
        quantity: 0,
        unitPrice: 0,
        currency: "JPY",
        deliveryDate: "",
        remarks: "",
        materialIds: [],
        requiredMaterialAmount: 0,
        moldingTime: 0,
        shipped: false,
        delivered: false,
        paid: false,
        purchaseOrderReceived: false,
        deliveryNoteSent: false,
        invoiceSent: false,
      });
    }
    setShowSaleModal(true);
  };

  const handleSaleSave = () => {
    // 必須項目のバリデーション
    if (!saleFormData.saleDate) {
      setSaleValidationError(lang === "ja" ? "売上日を入力してください" : "Vui lòng nhập ngày bán");
      return;
    }
    if (!saleFormData.customerId) {
      setSaleValidationError(lang === "ja" ? "顧客を選択してください" : "Vui lòng chọn khách hàng");
      return;
    }
    if (!saleFormData.productId || !saleFormData.productId.trim()) {
      setSaleValidationError(lang === "ja" ? "製品を選択してください" : "Vui lòng chọn sản phẩm");
      return;
    }
    if (!saleFormData.quantity || saleFormData.quantity <= 0) {
      setSaleValidationError(lang === "ja" ? "数量を正しく入力してください" : "Vui lòng nhập số lượng chính xác");
      return;
    }
    if (!saleFormData.unitPrice || saleFormData.unitPrice <= 0) {
      setSaleValidationError(lang === "ja" ? "単価を正しく入力してください" : "Vui lòng nhập đơn giá chính xác");
      return;
    }
    if (!saleFormData.deliveryDate) {
      setSaleValidationError(lang === "ja" ? "納品予定日を入力してください" : "Vui lòng nhập ngày giao hàng");
      return;
    }

    // 選択された製品から自動計算
    const selectedProduct = products.find((p) => p.id === saleFormData.productId);
    const quantity = Number(saleFormData.quantity);
    const materialIds = selectedProduct?.materialIds || [];
    const requiredMaterialAmount = selectedProduct && selectedProduct.weight > 0 ? (quantity * selectedProduct.weight) / 1000 : 0;
    const moldingTime =
      selectedProduct && selectedProduct.length > 0 && selectedProduct.speed > 0
        ? (quantity * selectedProduct.length) / 1000 / selectedProduct.speed / 60
        : 0;

    const saleData = {
      poNumber: saleFormData.poNumber,
      saleDate: saleFormData.saleDate,
      customerId: saleFormData.customerId,
      productId: saleFormData.productId,
      quantity: quantity,
      unitPrice: Number(saleFormData.unitPrice),
      currency: saleFormData.currency,
      deliveryDate: saleFormData.deliveryDate,
      remarks: saleFormData.remarks,
      materialIds: materialIds,
      requiredMaterialAmount: requiredMaterialAmount,
      moldingTime: moldingTime,
      shipped: saleFormData.shipped,
      delivered: saleFormData.delivered,
      paid: saleFormData.paid,
      purchaseOrderReceived: saleFormData.purchaseOrderReceived,
      deliveryNoteSent: saleFormData.deliveryNoteSent,
      invoiceSent: saleFormData.invoiceSent,
    };

    const incrementalId = sales.length > 0 ? Math.max(...sales.map((s) => s.incrementalId)) + 1 : 1;
    if (editingSale) {
      setSales(sales.map((s) => (s.id === editingSale.id ? { ...s, ...saleData } : s)));
      const customer = suppliers.find((c) => c.id === saleFormData.customerId);
      const product = products.find((p) => p.id === saleFormData.productId);
      const amount = saleFormData.quantity * saleFormData.unitPrice;
      const currencySymbol = saleFormData.currency === "JPY" ? "¥" : saleFormData.currency === "VND" ? "" : "$";
      const currencySuffix = saleFormData.currency === "VND" ? " VND" : "";
      addActivity(
        "売上が更新されました",
        `${customer?.name || "顧客"} - ${product?.productName || "製品"} - ${currencySymbol}${amount.toLocaleString()}${currencySuffix}`,
        Edit,
        "text-blue-500"
      );
    } else {
      const newSale = {
        id: `sl-${String(incrementalId).padStart(3, "0")}`,
        incrementalId,
        ...saleData,
      };
      setSales([...sales, newSale]);
      const customer = suppliers.find((c) => c.id === saleFormData.customerId);
      const product = products.find((p) => p.id === saleFormData.productId);
      const amount = saleFormData.quantity * saleFormData.unitPrice;
      const currencySymbol = saleFormData.currency === "JPY" ? "¥" : saleFormData.currency === "VND" ? "" : "$";
      const currencySuffix = saleFormData.currency === "VND" ? " VND" : "";
      addActivity(
        "売上が計上されました",
        `${customer?.name || "顧客"} - ${product?.productName || "製品"} - ${currencySymbol}${amount.toLocaleString()}${currencySuffix}`,
        TrendingUp,
        "text-purple-500"
      );
    }
    setSaleValidationError("");
    setShowSaleModal(false);
  };

  const handleDeleteSale = (id: string) => {
    setDeleteSaleTargetId(id);
    setShowSaleDeleteConfirm(true);
  };

  const handleSaleDeleteConfirm = () => {
    if (deleteSaleTargetId) {
      const deletedSale = sales.find((s) => s.id === deleteSaleTargetId);
      setSales(sales.filter((s) => s.id !== deleteSaleTargetId));
      if (deletedSale) {
        const customer = suppliers.find((c) => c.id === deletedSale.customerId);
        const product = products.find((p) => p.id === deletedSale.productId);
        addActivity("売上が削除されました", `${customer?.name || "顧客"} - ${product?.productName || "製品"}`, Trash2, "text-red-500");
      }
      setShowSaleDeleteConfirm(false);
      setDeleteSaleTargetId("");
    }
  };

  const handleSaleDeleteCancel = () => {
    setShowSaleDeleteConfirm(false);
    setDeleteSaleTargetId("");
  };

  // 支払い関連の関数
  const handleOpenPaymentModal = (payment: Payment | null): void => {
    setPaymentValidationError("");
    if (payment) {
      setEditingPayment(payment);
      setPaymentFormData({
        category: payment.category,
        description: payment.description,
        paymentDate: payment.paymentDate,
        amount: payment.amount,
        currency: payment.currency,
        paymentMethod: payment.paymentMethod,
        status: payment.status,
        remarks: payment.remarks,
      });
    } else {
      setEditingPayment(null);
      const today = new Date().toISOString().split("T")[0];
      setPaymentFormData({
        category: "rent",
        description: "",
        paymentDate: today,
        amount: 0,
        currency: "JPY",
        paymentMethod: "bank",
        status: "pending",
        remarks: "",
      });
    }
    setShowPaymentModal(true);
  };

  const handlePaymentSave = () => {
    if (!paymentFormData.description) {
      setPaymentValidationError("内容は必須です");
      return;
    }
    if (!paymentFormData.amount) {
      setPaymentValidationError("金額は必須です");
      return;
    }

    if (editingPayment) {
      // 編集の場合
      setPayments(
        payments.map((p) =>
          p.id === editingPayment.id
            ? {
                ...p,
                category: paymentFormData.category,
                description: paymentFormData.description,
                paymentDate: paymentFormData.paymentDate,
                amount: Number(paymentFormData.amount),
                currency: paymentFormData.currency,
                paymentMethod: paymentFormData.paymentMethod,
                status: paymentFormData.status,
                remarks: paymentFormData.remarks,
              }
            : p
        )
      );
      const currencySymbol = paymentFormData.currency === "JPY" ? "¥" : paymentFormData.currency === "VND" ? "" : "$";
      const currencySuffix = paymentFormData.currency === "VND" ? " VND" : "";
      addActivity(
        "支払が更新されました",
        `${paymentFormData.description} - ${currencySymbol}${paymentFormData.amount.toLocaleString()}${currencySuffix}`,
        Edit,
        "text-blue-500"
      );
    } else {
      // 新規追加の場合
      const incrementalId = payments.length > 0 ? Math.max(...payments.map((p) => p.incrementalId)) + 1 : 1;
      const newPayment: Payment = {
        id: `pay-${String(incrementalId).padStart(3, "0")}`,
        incrementalId,
        masterId: "", // マスタから生成されていない独立した支払い
        yearMonth: selectedYearMonth,
        paymentDate: paymentFormData.paymentDate,
        category: paymentFormData.category,
        description: paymentFormData.description,
        amount: Number(paymentFormData.amount),
        currency: paymentFormData.currency,
        paymentMethod: paymentFormData.paymentMethod,
        status: paymentFormData.status,
        isFixed: false,
        remarks: paymentFormData.remarks,
      };
      setPayments([...payments, newPayment]);
      const currencySymbol = paymentFormData.currency === "JPY" ? "¥" : paymentFormData.currency === "VND" ? "" : "$";
      const currencySuffix = paymentFormData.currency === "VND" ? " VND" : "";
      addActivity(
        paymentFormData.status === "paid" ? "支払が完了しました" : "支払が登録されました",
        `${paymentFormData.description} - ${currencySymbol}${paymentFormData.amount.toLocaleString()}${currencySuffix}`,
        DollarSign,
        paymentFormData.status === "paid" ? "text-green-500" : "text-orange-500"
      );
    }
    setPaymentValidationError("");
    setShowPaymentModal(false);
  };

  const handleDeletePayment = (id: string) => {
    setDeletePaymentTargetId(id);
    setShowPaymentDeleteConfirm(true);
  };

  const handlePaymentDeleteConfirm = () => {
    if (deletePaymentTargetId) {
      const deletedPayment = payments.find((p) => p.id === deletePaymentTargetId);
      setPayments(payments.filter((p) => p.id !== deletePaymentTargetId));
      if (deletedPayment) {
        addActivity("支払が削除されました", `${deletedPayment.description}`, Trash2, "text-red-500");
      }
      setShowPaymentDeleteConfirm(false);
      setDeletePaymentTargetId("");
    }
  };

  const handlePaymentDeleteCancel = () => {
    setShowPaymentDeleteConfirm(false);
    setDeletePaymentTargetId("");
  };

  // 支払いマスタのCRUD関数
  const handleOpenPaymentMasterModal = (master: PaymentMaster | null): void => {
    setPaymentMasterValidationError("");
    if (master) {
      setEditingPaymentMaster(master);
      setPaymentMasterFormData({
        category: master.category,
        description: master.description,
        isFixed: master.isFixed,
        fixedAmount: master.fixedAmount,
        currency: master.currency,
        paymentMethod: master.paymentMethod,
        paymentDay: master.paymentDay,
        remarks: master.remarks,
      });
    } else {
      setEditingPaymentMaster(null);
      setPaymentMasterFormData({
        category: "rent",
        description: "",
        isFixed: false,
        fixedAmount: 0,
        currency: "JPY",
        paymentMethod: "bank",
        paymentDay: 30,
        remarks: "",
      });
    }
    setShowPaymentMasterModal(true);
  };

  const handlePaymentMasterSave = () => {
    if (!paymentMasterFormData.description) {
      setPaymentMasterValidationError("内容は必須です");
      return;
    }

    const masterData = {
      category: paymentMasterFormData.category,
      description: paymentMasterFormData.description,
      isFixed: paymentMasterFormData.isFixed,
      fixedAmount: Number(paymentMasterFormData.fixedAmount),
      currency: paymentMasterFormData.currency,
      paymentMethod: paymentMasterFormData.paymentMethod,
      paymentDay: Number(paymentMasterFormData.paymentDay),
      remarks: paymentMasterFormData.remarks,
    };

    const incrementalId = paymentMasters.length > 0 ? Math.max(...paymentMasters.map((m) => m.incrementalId)) + 1 : 1;
    if (editingPaymentMaster) {
      setPaymentMasters(paymentMasters.map((m) => (m.id === editingPaymentMaster.id ? { ...m, ...masterData } : m)));
      addActivity("支払いマスタが更新されました", `${paymentMasterFormData.description}`, Edit, "text-blue-500");
    } else {
      const newMaster = {
        id: `pmst-${String(incrementalId).padStart(3, "0")}`,
        incrementalId,
        ...masterData,
      };
      setPaymentMasters([...paymentMasters, newMaster]);
      addActivity("新規支払いマスタが登録されました", `${paymentMasterFormData.description}`, DollarSign, "text-green-500");
    }
    setPaymentMasterValidationError("");
    setShowPaymentMasterModal(false);
  };

  const handleDeletePaymentMaster = (id: string) => {
    setDeletePaymentMasterTargetId(id);
    setShowPaymentMasterDeleteConfirm(true);
  };

  const handlePaymentMasterDeleteConfirm = () => {
    if (deletePaymentMasterTargetId) {
      const deletedMaster = paymentMasters.find((m) => m.id === deletePaymentMasterTargetId);
      setPaymentMasters(paymentMasters.filter((m) => m.id !== deletePaymentMasterTargetId));
      if (deletedMaster) {
        addActivity("支払いマスタが削除されました", `${deletedMaster.description}`, Trash2, "text-red-500");
      }
      setShowPaymentMasterDeleteConfirm(false);
      setDeletePaymentMasterTargetId("");
    }
  };

  const handlePaymentMasterDeleteCancel = () => {
    setShowPaymentMasterDeleteConfirm(false);
    setDeletePaymentMasterTargetId("");
  };

  // 選択年月の支払いデータを自動生成
  const handleGeneratePayments = () => {
    // 選択年月の支払いデータが既に存在するかチェック
    const existingPayments = payments.filter((p) => p.yearMonth === selectedYearMonth);
    if (existingPayments.length > 0) {
      alert(lang === "ja" ? "選択された年月の支払いデータは既に存在します。" : "Dữ liệu thanh toán cho tháng đã chọn đã tồn tại.");
      return;
    }

    // 支払いマスタから支払いデータを生成
    const newPayments: Payment[] = paymentMasters.map((master, index) => {
      const [year, month] = selectedYearMonth.split("-");
      const lastDay = new Date(Number(year), Number(month), 0).getDate();
      const paymentDay = Math.min(master.paymentDay, lastDay);
      const paymentDate = `${selectedYearMonth}-${String(paymentDay).padStart(2, "0")}`;

      const incrementalId = payments.length > 0 ? Math.max(...payments.map((p) => p.incrementalId)) + 1 + index : 1 + index;

      return {
        id: `pay-${String(incrementalId).padStart(3, "0")}`,
        incrementalId,
        masterId: master.id,
        yearMonth: selectedYearMonth,
        paymentDate: paymentDate,
        category: master.category,
        description: master.description,
        amount: master.isFixed ? master.fixedAmount : 0,
        currency: master.currency,
        paymentMethod: master.paymentMethod,
        status: "pending" as const,
        isFixed: master.isFixed,
        remarks: master.remarks,
      };
    });

    setPayments([...payments, ...newPayments]);
    alert(
      lang === "ja"
        ? `${selectedYearMonth}の支払いデータを${newPayments.length}件生成しました。`
        : `Đã tạo ${newPayments.length} dữ liệu thanh toán cho ${selectedYearMonth}.`
    );
  };

  const filteredOrders = sortData(
    orders.filter((order) => {
      const supplier = suppliers.find((s) => s.id === order.supplierId);
      const supplierName = supplier ? supplier.name : "";
      const purchaseItem = purchaseItems.find((p) => p.id === order.productId);
      const productName = purchaseItem ? `${purchaseItem.productCode} ${purchaseItem.productName}` : "";
      const matchesSearch =
        productName.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
        supplierName.toLowerCase().includes(orderSearchQuery.toLowerCase());
      const matchesFilter =
        orderFilterStatus === "all" ||
        (orderFilterStatus === "ordered" && order.ordered) ||
        (orderFilterStatus === "delivered" && order.delivered) ||
        (orderFilterStatus === "paid" && order.paid);
      return matchesSearch && matchesFilter;
    }),
    orderSortConfig
  );

  const orderStats = {
    total: orders.length,
    ordered: orders.filter((o) => o.ordered).length,
    delivered: orders.filter((o) => o.delivered).length,
  };

  // 売上のフィルタリングと統計
  const filteredSales = sortData(
    sales.filter((sale) => {
      const customer = suppliers.find((s) => s.id === sale.customerId);
      const customerName = customer ? customer.name : "";
      const product = products.find((p) => p.id === sale.productId);
      const productName = product ? `${product.productCode} ${product.productName}` : "";
      const matchesSearch =
        productName.toLowerCase().includes(saleSearchQuery.toLowerCase()) ||
        customerName.toLowerCase().includes(saleSearchQuery.toLowerCase());
      const matchesFilter =
        saleFilterStatus === "all" ||
        (saleFilterStatus === "shipped" && sale.shipped) ||
        (saleFilterStatus === "delivered" && sale.delivered) ||
        (saleFilterStatus === "paid" && sale.paid);
      const matchesCustomer = saleFilterCustomer === "all" || sale.customerId === saleFilterCustomer;
      return matchesSearch && matchesFilter && matchesCustomer;
    }),
    saleSortConfig
  );

  const saleStats = {
    total: sales.length,
    shipped: sales.filter((s) => s.shipped).length,
    delivered: sales.filter((s) => s.delivered).length,
    paid: sales.filter((s) => s.paid).length,
  };

  // 支払いのフィルタリングと統計
  // 選択年月の支払いをフィルタリング
  const filteredPayments = sortData(
    payments.filter((payment) => {
      const matchesYearMonth = payment.yearMonth === selectedYearMonth;
      const matchesSearch = payment.description.toLowerCase().includes(paymentSearchQuery.toLowerCase());
      const matchesFilter = paymentFilterCategory === "all" || payment.category === paymentFilterCategory;
      return matchesYearMonth && matchesSearch && matchesFilter;
    }),
    paymentSortConfig
  );

  // 選択年月の支払い統計
  const paymentStats = {
    total: payments.filter((p) => p.yearMonth === selectedYearMonth).length,
    paid: payments.filter((p) => p.yearMonth === selectedYearMonth && p.status === "paid").length,
    pending: payments.filter((p) => p.yearMonth === selectedYearMonth && p.status === "pending").length,
  };

  // 支払いマスタのフィルタリングと統計
  const filteredPaymentMasters = sortData(
    paymentMasters.filter((master) => {
      const matchesSearch = master.description.toLowerCase().includes(paymentMasterSearchQuery.toLowerCase());
      const matchesFilter = paymentMasterFilterCategory === "all" || master.category === paymentMasterFilterCategory;
      return matchesSearch && matchesFilter;
    }),
    paymentMasterSortConfig
  );

  const paymentMasterStats = {
    total: paymentMasters.length,
    fixed: paymentMasters.filter((m) => m.isFixed).length,
    variable: paymentMasters.filter((m) => !m.isFixed).length,
  };

  const filteredSuppliers = sortData(
    suppliers.filter((supplier) => {
      const matchesSearch = supplier.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterType === "all" || supplier.type === filterType;
      return matchesSearch && matchesFilter;
    }),
    supplierSortConfig
  );

  const stats = {
    total: suppliers.length,
    active: suppliers.filter((s) => s.status === "active").length,
    inactive: suppliers.filter((s) => s.status === "inactive").length,
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  // ダッシュボード用の計算（ordersが変更されるたびに再計算）
  const calculateMonthlyPurchase = () => {
    // 現在の年月を取得
    const now = new Date();
    const targetMonth = now.getMonth();
    const targetYear = now.getFullYear();

    console.log("=== 今月の仕入計算 ===");
    console.log("全発注データ:", orders);
    console.log(`対象年月: ${targetYear}年${targetMonth + 1}月`);

    // 今月のデータでフィルター（発注済みまたは納品済み）
    const currentMonthOrders = orders.filter((order) => {
      if (!order.orderDate) {
        console.log("発注日なし:", order);
        return false;
      }

      const orderDate = new Date(order.orderDate);
      const orderMonth = orderDate.getMonth();
      const orderYear = orderDate.getFullYear();

      console.log(
        `発注ID ${order.id}: 日付=${order.orderDate}, 月=${orderMonth}, 年=${orderYear}, 発注済み=${order.ordered}, 納品済み=${order.delivered}`
      );

      const isCurrentMonth = orderMonth === targetMonth && orderYear === targetYear;
      const isValidStatus = order.ordered || order.delivered;

      const result = isCurrentMonth && isValidStatus;
      console.log(`  → 今月判定=${isCurrentMonth}, ステータス判定=${isValidStatus}, 結果=${result}`);

      return result;
    });

    console.log("今月の対象発注:", currentMonthOrders);

    // 通貨別に合計を計算
    let totalUSD = 0;
    let totalJPY = 0;
    let totalVND = 0;

    currentMonthOrders.forEach((order) => {
      const quantity = Number(order.quantity) || 0;
      const unitPrice = Number(order.unitPrice) || 0;
      const amount = quantity * unitPrice;

      console.log(`発注ID ${order.id}: ${quantity} × ${unitPrice} = ${amount} ${order.currency}`);

      if (order.currency === "USD") {
        totalUSD += amount;
      } else if (order.currency === "JPY") {
        totalJPY += amount;
      } else if (order.currency === "VND") {
        totalVND += amount;
      }
    });

    // USDに換算（設定された換算レートを使用）
    const usdEquivalent = totalUSD + totalJPY / exchangeRates.jpy + totalVND / exchangeRates.vnd;

    console.log(`合計: USD=${totalUSD}, JPY=${totalJPY}, VND=${totalVND}`);
    console.log(`USD換算: ${usdEquivalent}`);
    console.log("==================");

    // 今月の発注件数
    const orderCount = currentMonthOrders.length;

    // 今月の未納入件数（発注済みだが納品されていないものをカウント）
    const pendingCount = currentMonthOrders.filter((order) => order.ordered && !order.delivered).length;

    return {
      total: usdEquivalent,
      orderCount: orderCount,
      pendingCount: pendingCount,
      usd: totalUSD,
      jpy: totalJPY,
      vnd: totalVND,
    };
  };

  const calculateMonthlySales = () => {
    // 現在の年月を取得
    const now = new Date();
    const targetMonth = now.getMonth();
    const targetYear = now.getFullYear();

    // 今月のデータでフィルター
    const currentMonthSales = sales.filter((sale) => {
      if (!sale.saleDate) {
        return false;
      }

      const saleDate = new Date(sale.saleDate);
      const saleMonth = saleDate.getMonth();
      const saleYear = saleDate.getFullYear();

      return saleMonth === targetMonth && saleYear === targetYear;
    });

    // 通貨別に合計を計算
    let totalUSD = 0;
    let totalJPY = 0;
    let totalVND = 0;

    currentMonthSales.forEach((sale) => {
      const quantity = Number(sale.quantity) || 0;
      const unitPrice = Number(sale.unitPrice) || 0;
      const amount = quantity * unitPrice;

      if (sale.currency === "USD") {
        totalUSD += amount;
      } else if (sale.currency === "JPY") {
        totalJPY += amount;
      } else if (sale.currency === "VND") {
        totalVND += amount;
      }
    });

    // USDに換算（設定された換算レートを使用）
    const usdEquivalent = totalUSD + totalJPY / exchangeRates.jpy + totalVND / exchangeRates.vnd;

    // 今月の受注件数
    const salesCount = currentMonthSales.length;

    // 今月の未出荷件数
    const pendingSalesCount = currentMonthSales.filter((sale) => !sale.shipped).length;

    // 今月の出荷済み件数
    const shippedSalesCount = currentMonthSales.filter((sale) => sale.shipped).length;

    return {
      total: usdEquivalent,
      salesCount: salesCount,
      pendingSalesCount: pendingSalesCount,
      shippedSalesCount: shippedSalesCount,
      usd: totalUSD,
      jpy: totalJPY,
      vnd: totalVND,
    };
  };

  const calculateMonthlyPayments = () => {
    // 現在の年月を取得（YYYY-MM形式）
    const now = new Date();
    const currentYearMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

    // 今月の支払いデータをフィルター
    const currentMonthPayments = payments.filter((payment) => payment.yearMonth === currentYearMonth);

    // 通貨別に合計を計算
    let totalUSD = 0;
    let totalJPY = 0;
    let totalVND = 0;

    currentMonthPayments.forEach((payment) => {
      const amount = Number(payment.amount) || 0;

      if (payment.currency === "USD") {
        totalUSD += amount;
      } else if (payment.currency === "JPY") {
        totalJPY += amount;
      } else if (payment.currency === "VND") {
        totalVND += amount;
      }
    });

    // USDに換算
    const usdEquivalent = totalUSD + totalJPY / exchangeRates.jpy + totalVND / exchangeRates.vnd;

    // 支払済み件数
    const paidCount = currentMonthPayments.filter((p) => p.status === "paid").length;

    return {
      total: usdEquivalent,
      paymentCount: currentMonthPayments.length,
      paidCount: paidCount,
      usd: totalUSD,
      jpy: totalJPY,
      vnd: totalVND,
    };
  };

  // レポート用：顧客別売上集計
  const calculateSalesByCustomer = () => {
    const customerSales: { [key: string]: { name: string; total: number } } = {};

    sales.forEach((sale) => {
      const supplier = suppliers.find((s) => s.id === sale.customerId);
      const customerName = supplier?.name || "不明";

      const quantity = Number(sale.quantity) || 0;
      const unitPrice = Number(sale.unitPrice) || 0;
      let amount = quantity * unitPrice;

      // USD換算
      if (sale.currency === "JPY") {
        amount = amount / exchangeRates.jpy;
      } else if (sale.currency === "VND") {
        amount = amount / exchangeRates.vnd;
      }

      if (!customerSales[sale.customerId]) {
        customerSales[sale.customerId] = { name: customerName, total: 0 };
      }
      customerSales[sale.customerId].total += amount;
    });

    return Object.values(customerSales)
      .sort((a, b) => b.total - a.total)
      .map((item, index) => ({
        rank: index + 1,
        name: item.name,
        amount: item.total,
      }));
  };

  // レポート用：仕入先別仕入集計
  const calculatePurchaseBySupplier = () => {
    const supplierPurchases: { [key: string]: { name: string; total: number; count: number } } = {};

    orders.forEach((order) => {
      const supplier = suppliers.find((s) => s.id === order.supplierId);
      const supplierName = supplier?.name || "不明";

      const quantity = Number(order.quantity) || 0;
      const unitPrice = Number(order.unitPrice) || 0;
      let amount = quantity * unitPrice;

      // USD換算
      if (order.currency === "JPY") {
        amount = amount / exchangeRates.jpy;
      } else if (order.currency === "VND") {
        amount = amount / exchangeRates.vnd;
      }

      if (!supplierPurchases[order.supplierId]) {
        supplierPurchases[order.supplierId] = { name: supplierName, total: 0, count: 0 };
      }
      supplierPurchases[order.supplierId].total += amount;
      supplierPurchases[order.supplierId].count += 1;
    });

    return Object.values(supplierPurchases).sort((a, b) => b.total - a.total);
  };

  // レポート用：製品別売上集計
  const calculateSalesByProduct = () => {
    const productSales: { [key: string]: { name: string; total: number } } = {};

    sales.forEach((sale) => {
      const product = products.find((p) => p.id === sale.productId);
      const productName = product?.productName || "不明";

      const quantity = Number(sale.quantity) || 0;
      const unitPrice = Number(sale.unitPrice) || 0;
      let amount = quantity * unitPrice;

      // USD換算
      if (sale.currency === "JPY") {
        amount = amount / exchangeRates.jpy;
      } else if (sale.currency === "VND") {
        amount = amount / exchangeRates.vnd;
      }

      if (!productSales[sale.productId]) {
        productSales[sale.productId] = { name: productName, total: 0 };
      }
      productSales[sale.productId].total += amount;
    });

    return Object.values(productSales)
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{t.welcome}, Huong! 👋</h3>
        <p className="text-gray-600">本日は{tasks.length}件のタスクがあります</p>
      </div>

      <DashboardSummary
        translations={{
          totalSales: t.totalSales,
          totalPurchase: t.totalPurchase,
          monthlyPaymentAmount: t.monthlyPaymentAmount,
          monthlyOrderCount: t.monthlyOrderCount,
          pendingDeliveries: t.pendingDeliveries,
        }}
        monthlySales={calculateMonthlySales()}
        monthlyPurchase={calculateMonthlyPurchase()}
        monthlyPayments={calculateMonthlyPayments()}
      />

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{t.quickActions}</h3>
        <QuickActions actions={quickActions} translations={{ createNew: t.createNew }} onActionClick={setCurrentPage} />
      </div>

      <Alerts alerts={alerts} title={t.alerts} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <TodayTasks tasks={tasks} title={t.todayTasks} approveText={t.approve} />
        </div>

        <div>
          <RecentActivity activities={activities} title={t.recentActivity} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesByCustomer data={salesData} title={t.salesByCustomer} colors={COLORS} />
        <CashFlow data={cashFlowData} title={t.cashFlow} />
      </div>
    </div>
  );

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.productCode.toLowerCase().includes(productSearchQuery.toLowerCase()) ||
      product.productName.toLowerCase().includes(productSearchQuery.toLowerCase());
    const matchesFilter = productFilterCategory === "all" || product.category === productFilterCategory;
    return matchesSearch && matchesFilter;
  });

  const productStats = {
    total: products.length,
    active: products.filter((p) => p.status === "active").length,
    inactive: products.filter((p) => p.status === "inactive").length,
  };

  const filteredPurchaseItems = purchaseItems.filter((item) => {
    const matchesSearch =
      item.productCode.toLowerCase().includes(purchaseItemSearchQuery.toLowerCase()) ||
      item.productName.toLowerCase().includes(purchaseItemSearchQuery.toLowerCase());
    const matchesFilter = purchaseItemFilterCategory === "all" || item.category === purchaseItemFilterCategory;
    return matchesSearch && matchesFilter;
  });

  const purchaseItemStats = {
    total: purchaseItems.length,
    active: purchaseItems.filter((p) => p.status === "active").length,
    inactive: purchaseItems.filter((p) => p.status === "inactive").length,
  };

  const renderProducts = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{t.totalProducts}</p>
              <p className="text-3xl font-bold text-gray-800">{productStats.total}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Package className="text-blue-500" size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{t.activeProducts}</p>
              <p className="text-3xl font-bold text-green-600">{productStats.active}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle className="text-green-500" size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{t.inactiveProducts}</p>
              <p className="text-3xl font-bold text-gray-600">{productStats.inactive}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <Clock className="text-gray-500" size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder={t.search}
                value={productSearchQuery}
                onChange={(e) => setProductSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={productFilterCategory}
              onChange={(e) => setProductFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">{t.all}</option>
              <option value="raw_material">{t.raw_material}</option>
              <option value="finished_goods">{t.finished_goods}</option>
              <option value="semi_finished">{t.semi_finished}</option>
              <option value="parts">{t.parts}</option>
              <option value="other">{t.other}</option>
            </select>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <button className="px-3 md:px-4 py-2 text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-lg flex items-center gap-2 text-sm md:text-base">
              <Download size={18} />
              <span className="hidden sm:inline">{t.export}</span>
            </button>
            <button
              onClick={() => handleOpenProductModal(null)}
              className="px-4 md:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 font-medium text-sm md:text-base"
            >
              <Plus size={20} />
              <span>{t.addProduct}</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-y border-gray-200">
              <tr>
                <SortableHeader
                  label={t.productCode}
                  sortKey="productCode"
                  currentConfig={productSortConfig}
                  onClick={() => handleSort("productCode", productSortConfig, setProductSortConfig)}
                />
                <SortableHeader
                  label={t.productName}
                  sortKey="productName"
                  currentConfig={productSortConfig}
                  onClick={() => handleSort("productName", productSortConfig, setProductSortConfig)}
                />
                <SortableHeader
                  label={t.productCategory}
                  sortKey="category"
                  currentConfig={productSortConfig}
                  onClick={() => handleSort("category", productSortConfig, setProductSortConfig)}
                />
                <SortableHeader
                  label={t.unit}
                  sortKey="unit"
                  currentConfig={productSortConfig}
                  onClick={() => handleSort("unit", productSortConfig, setProductSortConfig)}
                />
                <SortableHeader
                  label={t.standardPrice}
                  sortKey="standardPrice"
                  currentConfig={productSortConfig}
                  onClick={() => handleSort("standardPrice", productSortConfig, setProductSortConfig)}
                />
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.materials}</th>
                <SortableHeader
                  label={t.weight}
                  sortKey="weight"
                  currentConfig={productSortConfig}
                  onClick={() => handleSort("weight", productSortConfig, setProductSortConfig)}
                />
                <SortableHeader
                  label={t.lengthField}
                  sortKey="length"
                  currentConfig={productSortConfig}
                  onClick={() => handleSort("length", productSortConfig, setProductSortConfig)}
                />
                <SortableHeader
                  label={t.speed}
                  sortKey="speed"
                  currentConfig={productSortConfig}
                  onClick={() => handleSort("speed", productSortConfig, setProductSortConfig)}
                />
                <SortableHeader
                  label={t.status}
                  sortKey="status"
                  currentConfig={productSortConfig}
                  onClick={() => handleSort("status", productSortConfig, setProductSortConfig)}
                />
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">{t.deleteAction}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  onClick={() => handleOpenProductModal(product)}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-800">{product.productCode}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-800">{product.productName}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {lang === "ja"
                      ? product.category === "raw_material"
                        ? "原材料"
                        : product.category === "finished_goods"
                        ? "完成品"
                        : product.category === "semi_finished"
                        ? "半製品"
                        : product.category === "parts"
                        ? "部品"
                        : "その他"
                      : product.category === "raw_material"
                      ? "Nguyên liệu"
                      : product.category === "finished_goods"
                      ? "Thành phẩm"
                      : product.category === "semi_finished"
                      ? "Bán thành phẩm"
                      : product.category === "parts"
                      ? "Linh kiện"
                      : "Khác"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{t[product.unit as keyof typeof t] || product.unit}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {product.currency} {product.standardPrice.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {product.materialIds.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {product.materialIds.map((matId) => {
                          const material = purchaseItems.find((item) => item.id === matId);
                          return material ? (
                            <span key={matId} className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                              {material.productCode}
                            </span>
                          ) : null;
                        })}
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {product.weight > 0 ? `${product.weight} ${t.weightUnit}` : <span className="text-gray-400">-</span>}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {product.length > 0 ? `${product.length} ${t.lengthUnit}` : <span className="text-gray-400">-</span>}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {product.speed > 0 ? `${product.speed} ${t.speedUnit}` : <span className="text-gray-400">-</span>}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        product.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {product.status === "active" ? t.active : t.inactive}
                    </span>
                  </td>
                  <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => handleProductDeleteClick(product.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderPurchaseItems = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{t.totalProducts}</p>
              <p className="text-3xl font-bold text-gray-800">{purchaseItemStats.total}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Package className="text-blue-500" size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{t.activeProducts}</p>
              <p className="text-3xl font-bold text-green-600">{purchaseItemStats.active}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle className="text-green-500" size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{t.inactiveProducts}</p>
              <p className="text-3xl font-bold text-gray-600">{purchaseItemStats.inactive}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <Clock className="text-gray-500" size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder={t.search}
                value={purchaseItemSearchQuery}
                onChange={(e) => setPurchaseItemSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={purchaseItemFilterCategory}
              onChange={(e) => setPurchaseItemFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">{t.all}</option>
              <option value="raw_material">{t.raw_material}</option>
              <option value="finished_goods">{t.finished_goods}</option>
              <option value="semi_finished">{t.semi_finished}</option>
              <option value="parts">{t.parts}</option>
              <option value="other">{t.other}</option>
            </select>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <button className="px-3 md:px-4 py-2 text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-lg flex items-center gap-2 text-sm md:text-base">
              <Download size={18} />
              <span className="hidden sm:inline">{t.export}</span>
            </button>
            <button
              onClick={() => handleOpenPurchaseItemModal(null)}
              className="px-4 md:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 font-medium text-sm md:text-base"
            >
              <Plus size={20} />
              <span>{t.addPurchaseItem}</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-y border-gray-200">
              <tr>
                <SortableHeader
                  label={t.productCode}
                  sortKey="productCode"
                  currentConfig={purchaseItemSortConfig}
                  onClick={() => handleSort("productCode", purchaseItemSortConfig, setPurchaseItemSortConfig)}
                />
                <SortableHeader
                  label={t.productName}
                  sortKey="productName"
                  currentConfig={purchaseItemSortConfig}
                  onClick={() => handleSort("productName", purchaseItemSortConfig, setPurchaseItemSortConfig)}
                />
                <SortableHeader
                  label={t.supplier}
                  sortKey="supplierId"
                  currentConfig={purchaseItemSortConfig}
                  onClick={() => handleSort("supplierId", purchaseItemSortConfig, setPurchaseItemSortConfig)}
                />
                <SortableHeader
                  label={t.productCategory}
                  sortKey="category"
                  currentConfig={purchaseItemSortConfig}
                  onClick={() => handleSort("category", purchaseItemSortConfig, setPurchaseItemSortConfig)}
                />
                <SortableHeader
                  label={t.unit}
                  sortKey="unit"
                  currentConfig={purchaseItemSortConfig}
                  onClick={() => handleSort("unit", purchaseItemSortConfig, setPurchaseItemSortConfig)}
                />
                <SortableHeader
                  label={t.standardPrice}
                  sortKey="standardPrice"
                  currentConfig={purchaseItemSortConfig}
                  onClick={() => handleSort("standardPrice", purchaseItemSortConfig, setPurchaseItemSortConfig)}
                />
                <SortableHeader
                  label={t.status}
                  sortKey="status"
                  currentConfig={purchaseItemSortConfig}
                  onClick={() => handleSort("status", purchaseItemSortConfig, setPurchaseItemSortConfig)}
                />
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">{t.deleteAction}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPurchaseItems.map((item) => {
                const supplier = suppliers.find((s) => s.id === item.supplierId);
                return (
                  <tr
                    key={item.id}
                    onClick={() => handleOpenPurchaseItemModal(item)}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-800">{item.productCode}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-800">{item.productName}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{supplier?.name || "未設定"}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {lang === "ja"
                        ? item.category === "raw_material"
                          ? "原材料"
                          : item.category === "finished_goods"
                          ? "完成品"
                          : item.category === "semi_finished"
                          ? "半製品"
                          : item.category === "parts"
                          ? "部品"
                          : "その他"
                        : item.category === "raw_material"
                        ? "Nguyên liệu"
                        : item.category === "finished_goods"
                        ? "Thành phẩm"
                        : item.category === "semi_finished"
                        ? "Bán thành phẩm"
                        : item.category === "parts"
                        ? "Linh kiện"
                        : "Khác"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{t[item.unit as keyof typeof t] || item.unit}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {item.currency} {item.standardPrice.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          item.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {item.status === "active" ? t.active : t.inactive}
                      </span>
                    </td>
                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => handlePurchaseItemDeleteClick(item.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{t.totalOrders}</p>
              <p className="text-3xl font-bold text-gray-800">{orderStats.total}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <ShoppingCart className="text-blue-500" size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{t.pendingOrders}</p>
              <p className="text-3xl font-bold text-orange-600">{orderStats.ordered}</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <Clock className="text-orange-500" size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{t.deliveredOrders}</p>
              <p className="text-3xl font-bold text-green-600">{orderStats.delivered}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle className="text-green-500" size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder={t.search}
                value={orderSearchQuery}
                onChange={(e) => setOrderSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={orderFilterStatus}
              onChange={(e) => setOrderFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">{t.all}</option>
              <option value="ordered">{t.ordered}</option>
              <option value="delivered">{t.delivered}</option>
              <option value="paid">{lang === "ja" ? "支払い済み" : "Đã thanh toán"}</option>
            </select>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <button className="px-3 md:px-4 py-2 text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-lg flex items-center gap-2 text-sm md:text-base">
              <Download size={18} />
              <span className="hidden sm:inline">{t.export}</span>
            </button>
            <button
              onClick={() => handleOpenOrderModal(null)}
              className="px-4 md:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 font-medium text-sm md:text-base"
            >
              <Plus size={20} />
              <span className="hidden sm:inline">{t.addOrder}</span>
              <span className="sm:hidden">追加</span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <SortableHeader
                  label={t.orderDate}
                  sortKey="orderDate"
                  currentConfig={orderSortConfig}
                  onClick={() => handleSort("orderDate", orderSortConfig, setOrderSortConfig)}
                />
                <SortableHeader
                  label={t.supplier}
                  sortKey="supplierId"
                  currentConfig={orderSortConfig}
                  onClick={() => handleSort("supplierId", orderSortConfig, setOrderSortConfig)}
                />
                <SortableHeader
                  label={t.product}
                  sortKey="product"
                  currentConfig={orderSortConfig}
                  onClick={() => handleSort("product", orderSortConfig, setOrderSortConfig)}
                />
                <SortableHeader
                  label={t.quantity}
                  sortKey="quantity"
                  currentConfig={orderSortConfig}
                  onClick={() => handleSort("quantity", orderSortConfig, setOrderSortConfig)}
                />
                <SortableHeader
                  label={t.unitPrice}
                  sortKey="unitPrice"
                  currentConfig={orderSortConfig}
                  onClick={() => handleSort("unitPrice", orderSortConfig, setOrderSortConfig)}
                />
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  {t.amount}
                </th>
                <SortableHeader
                  label={t.deliveryDate}
                  sortKey="deliveryDate"
                  currentConfig={orderSortConfig}
                  onClick={() => handleSort("deliveryDate", orderSortConfig, setOrderSortConfig)}
                />
                <SortableHeader
                  label={t.status}
                  sortKey="status"
                  currentConfig={orderSortConfig}
                  onClick={() => handleSort("status", orderSortConfig, setOrderSortConfig)}
                />
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  {lang === "ja" ? "書類状況" : "Tài liệu"}
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  {t.deleteAction}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 [&_td]:whitespace-nowrap">
              {filteredOrders.map((order) => {
                const supplier = suppliers.find((s) => s.id === order.supplierId);
                const totalAmount = order.quantity * order.unitPrice;
                return (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => handleOpenOrderModal(order)}
                  >
                    <td className="px-6 py-4 text-sm text-gray-700">{order.orderDate}</td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-800">{supplier?.name || "-"}</p>
                    </td>
                    <td className="px-6 py-4">
                      {(() => {
                        const purchaseItem = purchaseItems.find((p) => p.id === order.productId);
                        return purchaseItem ? (
                          <>
                            <p className="font-medium text-gray-800 leading-tight">{purchaseItem.productCode}</p>
                            <p className="text-sm text-gray-600 leading-tight">{purchaseItem.productName}</p>
                          </>
                        ) : (
                          <p className="text-sm text-gray-500">-</p>
                        );
                      })()}
                    </td>
                    <td className="px-6 py-4 text-right text-sm text-gray-700">{order.quantity.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right text-sm font-medium text-gray-800">
                      {order.currency === "VND"
                        ? `${order.unitPrice.toLocaleString()} VND`
                        : order.currency === "JPY"
                        ? `¥${order.unitPrice.toLocaleString()}`
                        : `$${order.unitPrice.toLocaleString()}`}
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-bold text-gray-800">
                      {order.currency === "VND"
                        ? `${totalAmount.toLocaleString()} VND`
                        : order.currency === "JPY"
                        ? `¥${totalAmount.toLocaleString()}`
                        : `$${totalAmount.toLocaleString()}`}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{order.deliveryDate}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1 text-xs">
                        <div className="flex items-center gap-1">
                          <span className={`w-2 h-2 rounded-full ${order.ordered ? "bg-green-500" : "bg-gray-300"}`}></span>
                          <span className="text-gray-600">{lang === "ja" ? "発注済み" : "Đặt hàng"}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className={`w-2 h-2 rounded-full ${order.delivered ? "bg-green-500" : "bg-gray-300"}`}></span>
                          <span className="text-gray-600">{lang === "ja" ? "納品済み" : "Giao hàng"}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className={`w-2 h-2 rounded-full ${order.paid ? "bg-green-500" : "bg-gray-300"}`}></span>
                          <span className="text-gray-600">{lang === "ja" ? "支払い済み" : "Thanh toán"}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1 text-xs">
                        <div className="flex items-center gap-1">
                          <span className={`w-2 h-2 rounded-full ${order.purchaseOrderSent ? "bg-green-500" : "bg-gray-300"}`}></span>
                          <span className="text-gray-600">{lang === "ja" ? "発注書送付" : "Gửi đơn"}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className={`w-2 h-2 rounded-full ${order.deliveryNoteReceived ? "bg-green-500" : "bg-gray-300"}`}></span>
                          <span className="text-gray-600">{lang === "ja" ? "納品書受領" : "Nhận giao"}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className={`w-2 h-2 rounded-full ${order.invoiceReceived ? "bg-green-500" : "bg-gray-300"}`}></span>
                          <span className="text-gray-600">{lang === "ja" ? "請求書受領" : "Nhận hóa đơn"}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleOrderDeleteClick(order.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title={t.delete}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderSuppliers = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{t.totalSuppliers}</p>
              <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Users className="text-blue-500" size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{t.activeSuppliers}</p>
              <p className="text-3xl font-bold text-green-600">{stats.active}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <Users className="text-green-500" size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{t.inactiveSuppliers}</p>
              <p className="text-3xl font-bold text-gray-400">{stats.inactive}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <Users className="text-gray-400" size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder={t.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">{t.all}</option>
              <option value="material">{t.material}</option>
              <option value="processing">{t.processing}</option>
              <option value="logistics">{t.logistics}</option>
              <option value="customer">{t.customer}</option>
              <option value="other">{t.other}</option>
            </select>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <button className="px-3 md:px-4 py-2 text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-lg flex items-center gap-2 text-sm md:text-base">
              <Download size={18} />
              <span className="hidden sm:inline">{t.export}</span>
            </button>
            <button className="px-3 md:px-4 py-2 text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-lg flex items-center gap-2 text-sm md:text-base">
              <Upload size={18} />
              <span className="hidden sm:inline">{t.import}</span>
            </button>
            <button
              onClick={() => handleOpenModal(null)}
              className="px-4 md:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 font-medium text-sm md:text-base"
            >
              <Plus size={20} />
              <span className="hidden sm:inline">{t.addSupplier}</span>
              <span className="sm:hidden">追加</span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <SortableHeader
                  label={t.supplier}
                  sortKey="name"
                  currentConfig={supplierSortConfig}
                  onClick={() => handleSort("name", supplierSortConfig, setSupplierSortConfig)}
                />
                <SortableHeader
                  label={t.type}
                  sortKey="type"
                  currentConfig={supplierSortConfig}
                  onClick={() => handleSort("type", supplierSortConfig, setSupplierSortConfig)}
                />
                <SortableHeader
                  label={t.region}
                  sortKey="region"
                  currentConfig={supplierSortConfig}
                  onClick={() => handleSort("region", supplierSortConfig, setSupplierSortConfig)}
                />
                <SortableHeader
                  label={t.currency}
                  sortKey="currency"
                  currentConfig={supplierSortConfig}
                  onClick={() => handleSort("currency", supplierSortConfig, setSupplierSortConfig)}
                />
                <SortableHeader
                  label={t.paymentTerms}
                  sortKey="paymentTerms"
                  currentConfig={supplierSortConfig}
                  onClick={() => handleSort("paymentTerms", supplierSortConfig, setSupplierSortConfig)}
                />
                <SortableHeader
                  label={t.status}
                  sortKey="status"
                  currentConfig={supplierSortConfig}
                  onClick={() => handleSort("status", supplierSortConfig, setSupplierSortConfig)}
                />
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  {t.deleteAction}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 [&_td]:whitespace-nowrap">
              {filteredSuppliers.map((supplier) => (
                <tr
                  key={supplier.id}
                  onClick={() => handleOpenModal(supplier)}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-800">{supplier.name}</p>
                      <p className="text-sm text-gray-500">{supplier.remarks}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full">{t[supplier.type]}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{t[supplier.region]}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{supplier.currency}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{t[supplier.paymentTerms]}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        supplier.status === "active" ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {t[supplier.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => handleDeleteClick(supplier.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title={t.delete}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderSales = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{t.totalSalesCount}</p>
              <p className="text-3xl font-bold text-gray-800">{saleStats.total}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <TrendingUp className="text-blue-500" size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{t.shippedSales}</p>
              <p className="text-3xl font-bold text-orange-600">{saleStats.shipped}</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <Clock className="text-orange-500" size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{t.deliveredSales}</p>
              <p className="text-3xl font-bold text-purple-600">{saleStats.delivered}</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <Package className="text-purple-500" size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{lang === "ja" ? "入金済み" : "Đã thanh toán"}</p>
              <p className="text-3xl font-bold text-green-600">{saleStats.paid}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle className="text-green-500" size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder={t.search}
                value={saleSearchQuery}
                onChange={(e) => setSaleSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={saleFilterStatus}
              onChange={(e) => setSaleFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">{t.all}</option>
              <option value="shipped">{t.shipped}</option>
              <option value="delivered">{t.delivered}</option>
              <option value="paid">{lang === "ja" ? "入金済み" : "Đã thanh toán"}</option>
            </select>
            <select
              value={saleFilterCustomer}
              onChange={(e) => setSaleFilterCustomer(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">{lang === "ja" ? "全ての顧客" : "Tất cả khách hàng"}</option>
              {suppliers
                .filter((s) => s.type === "customer")
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <button className="px-3 md:px-4 py-2 text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-lg flex items-center gap-2 text-sm md:text-base">
              <Download size={18} />
              <span className="hidden sm:inline">{t.export}</span>
            </button>
            <button
              onClick={() => handleOpenSaleModal(null)}
              className="px-4 md:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 font-medium text-sm md:text-base"
            >
              <Plus size={20} />
              <span className="hidden sm:inline">{t.addSale}</span>
              <span className="sm:hidden">追加</span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <SortableHeader
                  label={t.poNumber}
                  sortKey="poNumber"
                  currentConfig={saleSortConfig}
                  onClick={() => handleSort("poNumber", saleSortConfig, setSaleSortConfig)}
                />
                <SortableHeader
                  label={t.saleDate}
                  sortKey="saleDate"
                  currentConfig={saleSortConfig}
                  onClick={() => handleSort("saleDate", saleSortConfig, setSaleSortConfig)}
                />
                <SortableHeader
                  label={t.customerName}
                  sortKey="customerId"
                  currentConfig={saleSortConfig}
                  onClick={() => handleSort("customerId", saleSortConfig, setSaleSortConfig)}
                />
                <SortableHeader
                  label={t.product}
                  sortKey="product"
                  currentConfig={saleSortConfig}
                  onClick={() => handleSort("product", saleSortConfig, setSaleSortConfig)}
                />
                <SortableHeader
                  label={t.orderQuantity}
                  sortKey="quantity"
                  currentConfig={saleSortConfig}
                  onClick={() => handleSort("quantity", saleSortConfig, setSaleSortConfig)}
                />
                <SortableHeader
                  label={t.unitPrice}
                  sortKey="unitPrice"
                  currentConfig={saleSortConfig}
                  onClick={() => handleSort("unitPrice", saleSortConfig, setSaleSortConfig)}
                />
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  {t.amount}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  {t.requiredMaterialAmount}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  {t.moldingTime}
                </th>
                <SortableHeader
                  label={t.deliveryDate}
                  sortKey="deliveryDate"
                  currentConfig={saleSortConfig}
                  onClick={() => handleSort("deliveryDate", saleSortConfig, setSaleSortConfig)}
                />
                <SortableHeader
                  label={t.status}
                  sortKey="status"
                  currentConfig={saleSortConfig}
                  onClick={() => handleSort("status", saleSortConfig, setSaleSortConfig)}
                />
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  {lang === "ja" ? "書類状況" : "Tài liệu"}
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  {t.deleteAction}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 [&_td]:whitespace-nowrap">
              {filteredSales.map((sale) => {
                const customer = suppliers.find((s) => s.id === sale.customerId);
                const totalAmount = sale.quantity * sale.unitPrice;
                return (
                  <tr key={sale.id} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => handleOpenSaleModal(sale)}>
                    <td className="px-6 py-4 text-sm font-medium text-blue-600">{sale.poNumber}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{sale.saleDate}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-800">{customer?.name || "-"}</div>
                      <div className="text-xs text-gray-500">
                        {customer?.region ? (t[customer.region as keyof typeof t] as string) : "-"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {(() => {
                        const product = products.find((p) => p.id === sale.productId);
                        return product ? (
                          <>
                            <p className="font-medium text-gray-800 leading-tight">{product.productCode}</p>
                            <p className="text-sm text-gray-600 leading-tight">{product.productName}</p>
                          </>
                        ) : (
                          <p className="text-sm text-gray-500">-</p>
                        );
                      })()}
                    </td>
                    <td className="px-6 py-4 text-right text-sm text-gray-700">{sale.quantity.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right text-sm font-medium text-gray-800">
                      {sale.currency === "VND"
                        ? `${sale.unitPrice.toLocaleString()} VND`
                        : sale.currency === "JPY"
                        ? `¥${sale.unitPrice.toLocaleString()}`
                        : `$${sale.unitPrice.toLocaleString()}`}
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-bold text-gray-800">
                      {sale.currency === "VND"
                        ? `${totalAmount.toLocaleString()} VND`
                        : sale.currency === "JPY"
                        ? `¥${totalAmount.toLocaleString()}`
                        : `$${totalAmount.toLocaleString()}`}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {sale.requiredMaterialAmount > 0 ? (
                        <span>
                          {sale.requiredMaterialAmount.toLocaleString()} {t.requiredMaterialUnit}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {sale.moldingTime > 0 ? (
                        <span>
                          {sale.moldingTime.toFixed(2)} {t.timeUnit}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{sale.deliveryDate}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1 text-xs">
                        <div className="flex items-center gap-1">
                          <span className={`w-2 h-2 rounded-full ${sale.shipped ? "bg-green-500" : "bg-gray-300"}`}></span>
                          <span className="text-gray-600">{lang === "ja" ? "出荷済み" : "Xuất hàng"}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className={`w-2 h-2 rounded-full ${sale.delivered ? "bg-green-500" : "bg-gray-300"}`}></span>
                          <span className="text-gray-600">{lang === "ja" ? "納品済み" : "Giao hàng"}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className={`w-2 h-2 rounded-full ${sale.paid ? "bg-green-500" : "bg-gray-300"}`}></span>
                          <span className="text-gray-600">{lang === "ja" ? "入金済み" : "Nhận tiền"}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1 text-xs">
                        <div className="flex items-center gap-1">
                          <span className={`w-2 h-2 rounded-full ${sale.purchaseOrderReceived ? "bg-green-500" : "bg-gray-300"}`}></span>
                          <span className="text-gray-600">{lang === "ja" ? "発注書受領" : "Nhận đơn"}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className={`w-2 h-2 rounded-full ${sale.deliveryNoteSent ? "bg-green-500" : "bg-gray-300"}`}></span>
                          <span className="text-gray-600">{lang === "ja" ? "納品書送付" : "Gửi giao"}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className={`w-2 h-2 rounded-full ${sale.invoiceSent ? "bg-green-500" : "bg-gray-300"}`}></span>
                          <span className="text-gray-600">{lang === "ja" ? "請求書送付" : "Gửi hóa đơn"}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleDeleteSale(sale.id)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderPayments = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{t.totalPayments}</p>
              <p className="text-3xl font-bold text-gray-800">{paymentStats.total}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <DollarSign className="text-blue-500" size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{t.paidPayments}</p>
              <p className="text-3xl font-bold text-green-600">{paymentStats.paid}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle className="text-green-500" size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{t.pendingPayments}</p>
              <p className="text-3xl font-bold text-orange-600">{paymentStats.pending}</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <Clock className="text-orange-500" size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 md:p-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.selectYearMonth}</label>
                <input
                  type="month"
                  value={selectedYearMonth}
                  onChange={(e) => setSelectedYearMonth(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={handleGeneratePayments}
                className="sm:mt-6 px-4 md:px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 font-medium transition-colors text-sm md:text-base"
              >
                <Plus size={20} />
                <span className="hidden sm:inline">{t.generatePayments}</span>
                <span className="sm:hidden">生成</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col md:flex-row md:items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder={t.search}
                  value={paymentSearchQuery}
                  onChange={(e) => setPaymentSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select
                value={paymentFilterCategory}
                onChange={(e) => setPaymentFilterCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">{t.all}</option>
                <option value="rent">{t.rent}</option>
                <option value="utilities">{t.utilities}</option>
                <option value="salary">{t.salary}</option>
                <option value="other">{t.other}</option>
              </select>
            </div>
            <button
              onClick={() => handleOpenPaymentModal(null)}
              className="px-4 md:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 font-medium transition-colors text-sm md:text-base"
            >
              <Plus size={20} />
              <span className="hidden sm:inline">{t.addPayment}</span>
              <span className="sm:hidden">追加</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-50 border-y border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">No.</th>
                <SortableHeader
                  label={t.category}
                  sortKey="category"
                  currentConfig={paymentSortConfig}
                  onClick={() => handleSort("category", paymentSortConfig, setPaymentSortConfig)}
                />
                <SortableHeader
                  label={t.description}
                  sortKey="description"
                  currentConfig={paymentSortConfig}
                  onClick={() => handleSort("description", paymentSortConfig, setPaymentSortConfig)}
                />
                <SortableHeader
                  label={t.amount}
                  sortKey="amount"
                  currentConfig={paymentSortConfig}
                  onClick={() => handleSort("amount", paymentSortConfig, setPaymentSortConfig)}
                />
                <SortableHeader
                  label={t.paymentMethod}
                  sortKey="paymentMethod"
                  currentConfig={paymentSortConfig}
                  onClick={() => handleSort("paymentMethod", paymentSortConfig, setPaymentSortConfig)}
                />
                <SortableHeader
                  label={t.paymentDate}
                  sortKey="paymentDate"
                  currentConfig={paymentSortConfig}
                  onClick={() => handleSort("paymentDate", paymentSortConfig, setPaymentSortConfig)}
                />
                <SortableHeader
                  label={t.status}
                  sortKey="status"
                  currentConfig={paymentSortConfig}
                  onClick={() => handleSort("status", paymentSortConfig, setPaymentSortConfig)}
                />
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  {t.deleteAction}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPayments.map((payment) => {
                return (
                  <tr
                    key={payment.id}
                    onClick={() => handleOpenPaymentModal(payment)}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.incrementalId}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          payment.category === "rent"
                            ? "bg-blue-100 text-blue-800"
                            : payment.category === "utilities"
                            ? "bg-orange-100 text-orange-800"
                            : payment.category === "salary"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {payment.category === "rent"
                          ? t.rent
                          : payment.category === "utilities"
                          ? t.utilities
                          : payment.category === "salary"
                          ? t.salary
                          : t.other}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{payment.description}</div>
                      {payment.isFixed && <div className="text-xs text-blue-600 mt-1">{t.fixedCost}</div>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">
                        {payment.currency === "JPY"
                          ? `¥${payment.amount.toLocaleString()}`
                          : payment.currency === "VND"
                          ? `${payment.amount.toLocaleString()} VND`
                          : `$${payment.amount.toLocaleString()}`}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.paymentMethod === "bank" ? t.bank : payment.paymentMethod === "cash" ? t.cash : t.card}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.paymentDate || "-"}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          payment.status === "paid" ? "bg-green-50 text-green-700" : "bg-orange-50 text-orange-700"
                        }`}
                      >
                        {payment.status === "paid" ? t.paymentStatusPaid : t.paymentStatusPending}
                      </span>
                    </td>
                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => handleDeletePayment(payment.id)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderPaymentMaster = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{t.totalPaymentMasters}</p>
              <p className="text-3xl font-bold text-gray-800">{paymentMasterStats.total}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <DollarSign className="text-blue-500" size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{t.fixedCost}</p>
              <p className="text-3xl font-bold text-green-600">{paymentMasterStats.fixed}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle className="text-green-500" size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{t.variableCost}</p>
              <p className="text-3xl font-bold text-orange-600">{paymentMasterStats.variable}</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <Clock className="text-orange-500" size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder={t.search}
                value={paymentMasterSearchQuery}
                onChange={(e) => setPaymentMasterSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={paymentMasterFilterCategory}
              onChange={(e) => setPaymentMasterFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">{t.all}</option>
              <option value="rent">{t.rent}</option>
              <option value="utilities">{t.utilities}</option>
              <option value="salary">{t.salary}</option>
              <option value="other">{t.other}</option>
            </select>
          </div>
          <button
            onClick={() => handleOpenPaymentMasterModal(null)}
            className="px-4 md:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 font-medium transition-colors text-sm md:text-base"
          >
            <Plus size={20} />
            <span className="hidden sm:inline">{t.addPaymentMaster}</span>
            <span className="sm:hidden">追加</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-50 border-y border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">No.</th>
                <SortableHeader
                  label={t.category}
                  sortKey="category"
                  currentConfig={paymentMasterSortConfig}
                  onClick={() => handleSort("category", paymentMasterSortConfig, setPaymentMasterSortConfig)}
                />
                <SortableHeader
                  label={t.description}
                  sortKey="description"
                  currentConfig={paymentMasterSortConfig}
                  onClick={() => handleSort("description", paymentMasterSortConfig, setPaymentMasterSortConfig)}
                />
                <SortableHeader
                  label={t.fixedAmount}
                  sortKey="fixedAmount"
                  currentConfig={paymentMasterSortConfig}
                  onClick={() => handleSort("fixedAmount", paymentMasterSortConfig, setPaymentMasterSortConfig)}
                />
                <SortableHeader
                  label={t.paymentMethod}
                  sortKey="paymentMethod"
                  currentConfig={paymentMasterSortConfig}
                  onClick={() => handleSort("paymentMethod", paymentMasterSortConfig, setPaymentMasterSortConfig)}
                />
                <SortableHeader
                  label={t.paymentDay}
                  sortKey="paymentDay"
                  currentConfig={paymentMasterSortConfig}
                  onClick={() => handleSort("paymentDay", paymentMasterSortConfig, setPaymentMasterSortConfig)}
                />
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  {t.deleteAction}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPaymentMasters.map((master) => {
                return (
                  <tr
                    key={master.id}
                    onClick={() => handleOpenPaymentMasterModal(master)}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{master.incrementalId}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          master.category === "rent"
                            ? "bg-blue-100 text-blue-800"
                            : master.category === "utilities"
                            ? "bg-orange-100 text-orange-800"
                            : master.category === "salary"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {master.category === "rent"
                          ? t.rent
                          : master.category === "utilities"
                          ? t.utilities
                          : master.category === "salary"
                          ? t.salary
                          : t.other}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{master.description}</div>
                      {master.isFixed && <div className="text-xs text-blue-600 mt-1">{t.fixedCost}</div>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">
                        {master.isFixed
                          ? master.currency === "JPY"
                            ? `¥${master.fixedAmount.toLocaleString()}`
                            : master.currency === "VND"
                            ? `${master.fixedAmount.toLocaleString()} VND`
                            : `$${master.fixedAmount.toLocaleString()}`
                          : "-"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {master.paymentMethod === "bank" ? t.bank : master.paymentMethod === "cash" ? t.cash : t.card}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{master.paymentDay}日</td>
                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => handleDeletePaymentMaster(master.id)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">{t.exchangeRateSettings}</h3>
        <p className="text-sm text-gray-600 mb-6">{t.rateDescription}</p>

        <div className="space-y-6 max-w-2xl">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.jpyRate}</label>
            <div className="flex items-center gap-3">
              <span className="text-gray-600">1 USD =</span>
              <input
                type="number"
                value={exchangeRates.jpy}
                onChange={(e) => setExchangeRates({ ...exchangeRates, jpy: Number(e.target.value) })}
                className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="1"
                step="1"
              />
              <span className="text-gray-600">JPY</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.vndRate}</label>
            <div className="flex items-center gap-3">
              <span className="text-gray-600">1 USD =</span>
              <input
                type="number"
                value={exchangeRates.vnd}
                onChange={(e) => setExchangeRates({ ...exchangeRates, vnd: Number(e.target.value) })}
                className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="1"
                step="100"
              />
              <span className="text-gray-600">VND</span>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={() => {
                alert(lang === "ja" ? "設定を保存しました" : "Đã lưu cài đặt");
              }}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 font-medium"
            >
              <Save size={18} />
              {t.save}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* モバイル用オーバーレイ */}
      {mobileMenuOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)} />}

      {/* サイドバー */}
      <aside
        className={`${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 ${
          sidebarOpen ? "w-64" : "w-20"
        } bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}
      >
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          {sidebarOpen && (
            <div>
              <h1 className="font-bold text-lg text-gray-800">増田ビニール</h1>
              <p className="text-xs text-gray-500">経営管理システム</p>
            </div>
          )}
          <button
            onClick={() => {
              setSidebarOpen(!sidebarOpen);
              // モバイルの場合はメニューを閉じる
              if (window.innerWidth < 1024) {
                setMobileMenuOpen(false);
              }
            }}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentPage(item.page);
                // モバイルの場合はメニューを閉じる
                if (window.innerWidth < 1024) {
                  setMobileMenuOpen(false);
                }
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentPage === item.page ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <item.icon size={20} />
              {sidebarOpen && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
            <Settings size={20} />
            {sidebarOpen && <span>{t.settings}</span>}
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
            <LogOut size={20} />
            {sidebarOpen && <span>{t.logout}</span>}
          </button>
        </div>
      </aside>

      {/* メインコンテンツ */}
      <main className="flex-1 overflow-auto">
        {/* ヘッダー */}
        <header className="bg-white border-b border-gray-200 px-4 md:px-8 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            {/* モバイル用ハンバーガーメニュー */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg mr-4">
              <Menu size={24} />
            </button>

            <div className="flex-1">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                {currentPage === "dashboard" && t.dashboard}
                {currentPage === "suppliers" && t.supplierMaster}
                {currentPage === "purchaseItemMaster" && t.purchaseItemMaster}
                {currentPage === "orders" && t.orderMaster}
                {currentPage === "productMaster" && t.productMasterTitle}
                {currentPage === "sales" && t.saleMaster}
                {currentPage === "paymentMaster" && t.paymentMasterTitle}
                {currentPage === "payments" && t.paymentManagement}
                {currentPage === "reports" && t.reports}
                {currentPage === "systemSettings" && t.systemSettings}
              </h2>
              <p className="text-sm text-gray-500">
                {currentPage === "suppliers"
                  ? t.supplierList
                  : currentPage === "purchaseItemMaster"
                  ? t.purchaseItemList
                  : currentPage === "productMaster"
                  ? t.productMasterList
                  : currentPage === "orders"
                  ? t.orderList
                  : currentPage === "sales"
                  ? t.saleList
                  : currentPage === "paymentMaster"
                  ? t.paymentMasterList
                  : currentPage === "payments"
                  ? t.paymentList
                  : "2024年11月20日 (水)"}
              </p>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as "ja" | "vi")}
                className="px-2 md:px-4 py-2 border border-gray-300 rounded-lg text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ja">日本語</option>
                <option value="vi">Tiếng Việt</option>
              </select>
              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="hidden md:flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">H</div>
                <div className="text-sm">
                  <p className="font-medium text-gray-800">Huong Nguyen</p>
                  <p className="text-gray-500">経理担当</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* コンテンツエリア */}
        <div className="p-4 md:p-6 lg:px-20 mx-auto">
          {currentPage === "dashboard" && renderDashboard()}
          {currentPage === "suppliers" && renderSuppliers()}
          {currentPage === "purchaseItemMaster" && renderPurchaseItems()}
          {currentPage === "orders" && renderOrders()}
          {currentPage === "productMaster" && renderProducts()}
          {currentPage === "sales" && renderSales()}
          {currentPage === "paymentMaster" && renderPaymentMaster()}
          {currentPage === "payments" && renderPayments()}
          {currentPage === "reports" && (
            <div className="space-y-6">
              {/* ヘッダー */}
              <div className="bg-white p-4 md:p-6 rounded-lg shadow">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">{t.reportTitle}</h2>

                {/* タブ切り替え */}
                <div className="flex gap-2 border-b border-gray-200">
                  <button
                    onClick={() => setReportTab("sales")}
                    className={`px-4 py-2 font-medium transition-colors ${
                      reportTab === "sales" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    {t.salesReport}
                  </button>
                  <button
                    onClick={() => setReportTab("purchase")}
                    className={`px-4 py-2 font-medium transition-colors ${
                      reportTab === "purchase" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    {t.purchaseReport}
                  </button>
                  <button
                    onClick={() => setReportTab("financial")}
                    className={`px-4 py-2 font-medium transition-colors ${
                      reportTab === "financial" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    {t.financialReport}
                  </button>
                </div>

                {/* 期間選択 */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={() => setReportPeriod("thisMonth")}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      reportPeriod === "thisMonth" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {t.thisMonth}
                  </button>
                  <button
                    onClick={() => setReportPeriod("lastMonth")}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      reportPeriod === "lastMonth" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {t.lastMonth}
                  </button>
                  <button
                    onClick={() => setReportPeriod("thisQuarter")}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      reportPeriod === "thisQuarter" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {t.thisQuarter}
                  </button>
                  <button
                    onClick={() => setReportPeriod("thisYear")}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      reportPeriod === "thisYear" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {t.thisYear}
                  </button>
                </div>
              </div>

              {/* レポートコンテンツ */}
              {reportTab === "sales" && (
                <div className="space-y-6">
                  {/* サマリーカード */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                      <p className="text-sm text-gray-600 mb-1">総売上</p>
                      <p className="text-2xl font-bold text-gray-800">
                        ${calculateMonthlySales().total.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">今月の売上合計</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                      <p className="text-sm text-gray-600 mb-1">受注件数</p>
                      <p className="text-2xl font-bold text-gray-800">{calculateMonthlySales().salesCount}件</p>
                      <p className="text-xs text-gray-600 mt-1">今月の受注数</p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                      <p className="text-sm text-gray-600 mb-1">未出荷</p>
                      <p className="text-2xl font-bold text-gray-800">{calculateMonthlySales().pendingSalesCount}件</p>
                      <p className="text-xs text-orange-600 mt-1">出荷待ち</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                      <p className="text-sm text-gray-600 mb-1">出荷済み</p>
                      <p className="text-2xl font-bold text-gray-800">{calculateMonthlySales().shippedSalesCount}件</p>
                      <p className="text-xs text-green-600 mt-1">完了</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <SalesByCustomer
                      data={calculateSalesByProduct().map((item) => ({
                        name: item.name,
                        value: item.total,
                        currency: "USD",
                      }))}
                      title={t.salesByProduct}
                      colors={["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]}
                    />
                    <SalesByCustomer
                      data={calculateSalesByCustomer()
                        .slice(0, 5)
                        .map((item) => ({
                          name: item.name,
                          value: item.amount,
                          currency: "USD",
                        }))}
                      title={t.salesByCustomer}
                      colors={["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]}
                    />
                  </div>

                  {/* 上位顧客テーブル */}
                  <div className="bg-white p-4 md:p-6 rounded-lg shadow">
                    <h3 className="text-base md:text-lg font-bold mb-4">{t.topCustomers}</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">{t.rank}</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">{t.customerName}</th>
                            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">{t.salesAmount}</th>
                            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">{t.percentage}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {calculateSalesByCustomer()
                            .slice(0, 10)
                            .map((customer, index) => {
                              const totalSales = calculateMonthlySales().total;
                              const percentage = totalSales > 0 ? (customer.amount / totalSales) * 100 : 0;
                              return (
                                <tr key={index} className="hover:bg-gray-50">
                                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{customer.rank}</td>
                                  <td className="px-4 py-3 text-sm text-gray-700">{customer.name}</td>
                                  <td className="px-4 py-3 text-sm text-right font-medium text-gray-900">
                                    ${customer.amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                  </td>
                                  <td className="px-4 py-3 text-sm text-right text-gray-600">{percentage.toFixed(1)}%</td>
                                </tr>
                              );
                            })}
                          {calculateSalesByCustomer().length === 0 && (
                            <tr>
                              <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                                売上データがありません
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {reportTab === "purchase" && (
                <div className="space-y-6">
                  {/* サマリーカード */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                      <p className="text-sm text-gray-600 mb-1">総仕入</p>
                      <p className="text-2xl font-bold text-gray-800">
                        $
                        {calculateMonthlyPurchase().total.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">今月の仕入合計</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                      <p className="text-sm text-gray-600 mb-1">発注件数</p>
                      <p className="text-2xl font-bold text-gray-800">{calculateMonthlyPurchase().orderCount}件</p>
                      <p className="text-xs text-gray-600 mt-1">今月の発注数</p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                      <p className="text-sm text-gray-600 mb-1">未納入</p>
                      <p className="text-2xl font-bold text-gray-800">{calculateMonthlyPurchase().pendingCount}件</p>
                      <p className="text-xs text-orange-600 mt-1">納品待ち</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                      <p className="text-sm text-gray-600 mb-1">仕入先数</p>
                      <p className="text-2xl font-bold text-gray-800">{calculatePurchaseBySupplier().length}社</p>
                      <p className="text-xs text-gray-600 mt-1">取引仕入先</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <SalesByCustomer
                      data={calculatePurchaseBySupplier()
                        .slice(0, 5)
                        .map((item) => ({
                          name: item.name,
                          value: item.total,
                          currency: "USD",
                        }))}
                      title={t.purchaseBySupplierReport}
                      colors={["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]}
                    />
                    <div className="bg-white p-4 md:p-6 rounded-lg shadow">
                      <h3 className="text-base md:text-lg font-bold mb-4">仕入先別発注件数</h3>
                      <div className="space-y-3">
                        {calculatePurchaseBySupplier()
                          .slice(0, 5)
                          .map((supplier, index) => {
                            const totalPurchase = calculateMonthlyPurchase().total;
                            const percentage = totalPurchase > 0 ? (supplier.total / totalPurchase) * 100 : 0;
                            return (
                              <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center gap-3 flex-1">
                                  <div
                                    className={`w-3 h-3 rounded-full`}
                                    style={{ backgroundColor: ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"][index % 5] }}
                                  ></div>
                                  <span className="text-sm text-gray-700">{supplier.name}</span>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm font-medium text-gray-900">{supplier.count}件</p>
                                  <p className="text-xs text-gray-500">{percentage.toFixed(1)}%</p>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>

                  {/* 仕入先別詳細テーブル */}
                  <div className="bg-white p-4 md:p-6 rounded-lg shadow">
                    <h3 className="text-base md:text-lg font-bold mb-4">仕入先別詳細</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">{t.rank}</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">{t.supplier}</th>
                            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">{t.purchaseAmount}</th>
                            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">{t.count}</th>
                            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">{t.percentage}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {calculatePurchaseBySupplier().map((supplier, index) => {
                            const totalPurchase = calculateMonthlyPurchase().total;
                            const percentage = totalPurchase > 0 ? (supplier.total / totalPurchase) * 100 : 0;
                            return (
                              <tr key={index} className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm font-medium text-gray-900">{index + 1}</td>
                                <td className="px-4 py-3 text-sm text-gray-700">{supplier.name}</td>
                                <td className="px-4 py-3 text-sm text-right font-medium text-gray-900">
                                  ${supplier.total.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                </td>
                                <td className="px-4 py-3 text-sm text-right text-gray-600">{supplier.count}件</td>
                                <td className="px-4 py-3 text-sm text-right text-gray-600">{percentage.toFixed(1)}%</td>
                              </tr>
                            );
                          })}
                          {calculatePurchaseBySupplier().length === 0 && (
                            <tr>
                              <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                                仕入データがありません
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {reportTab === "financial" &&
                (() => {
                  const salesData = calculateMonthlySales();
                  const purchaseData = calculateMonthlyPurchase();
                  const paymentData = calculateMonthlyPayments();
                  const revenue = salesData.total;
                  const cost = purchaseData.total;
                  const profit = revenue - cost;
                  const profitMargin = revenue > 0 ? (profit / revenue) * 100 : 0;

                  return (
                    <div className="space-y-6">
                      {/* 損益概算 */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                          <p className="text-sm text-gray-600 mb-2">{t.revenue}</p>
                          <p className="text-2xl font-bold text-gray-800">
                            ${revenue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                          </p>
                          <p className="text-xs text-gray-600 mt-1">{salesData.salesCount}件の受注</p>
                        </div>
                        <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
                          <p className="text-sm text-gray-600 mb-2">{t.cost}</p>
                          <p className="text-2xl font-bold text-gray-800">
                            ${cost.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                          </p>
                          <p className="text-xs text-gray-600 mt-1">{purchaseData.orderCount}件の発注</p>
                        </div>
                        <div
                          className={`p-6 rounded-lg border-l-4 ${
                            profit >= 0 ? "bg-green-50 border-green-500" : "bg-red-50 border-red-500"
                          }`}
                        >
                          <p className="text-sm text-gray-600 mb-2">{t.profit}</p>
                          <p className={`text-2xl font-bold ${profit >= 0 ? "text-green-700" : "text-red-700"}`}>
                            ${profit.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                          </p>
                          <p className={`text-xs mt-1 ${profit >= 0 ? "text-green-600" : "text-red-600"}`}>
                            {t.profitMargin}: {profitMargin.toFixed(1)}%
                          </p>
                        </div>
                        <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
                          <p className="text-sm text-gray-600 mb-2">キャッシュバランス</p>
                          <p className="text-2xl font-bold text-gray-800">
                            $
                            {(revenue - paymentData.total).toLocaleString(undefined, {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })}
                          </p>
                          <p className="text-xs text-gray-600 mt-1">売上 - 支払</p>
                        </div>
                      </div>

                      {/* キャッシュフロー */}
                      <CashFlow data={cashFlowData} title={t.cashFlowSummary} />

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* 支払状況 */}
                        <div className="bg-white p-4 md:p-6 rounded-lg shadow">
                          <h3 className="text-base md:text-lg font-bold mb-4">{t.paymentStatusReport}</h3>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                              <span className="text-sm text-gray-600">{t.totalPayments}</span>
                              <span className="text-xl font-bold text-gray-800">{paymentData.paymentCount}件</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                              <span className="text-sm text-gray-600">{t.paidPayments}</span>
                              <span className="text-xl font-bold text-green-600">{paymentData.paidCount}件</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                              <span className="text-sm text-gray-600">{t.pendingPayments}</span>
                              <span className="text-xl font-bold text-orange-600">
                                {paymentData.paymentCount - paymentData.paidCount}件
                              </span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                              <span className="text-sm text-gray-600">{t.totalAmount}</span>
                              <span className="text-xl font-bold text-gray-800">
                                ${paymentData.total.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* 財務健全性指標 */}
                        <div className="bg-white p-4 md:p-6 rounded-lg shadow">
                          <h3 className="text-base md:text-lg font-bold mb-4">財務健全性指標</h3>
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-gray-600">利益率</span>
                                <span
                                  className={`text-sm font-semibold ${
                                    profitMargin >= 20 ? "text-green-600" : profitMargin >= 10 ? "text-orange-600" : "text-red-600"
                                  }`}
                                >
                                  {profitMargin.toFixed(1)}%
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${
                                    profitMargin >= 20 ? "bg-green-500" : profitMargin >= 10 ? "bg-orange-500" : "bg-red-500"
                                  }`}
                                  style={{ width: `${Math.min(profitMargin, 100)}%` }}
                                ></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-gray-600">支払完了率</span>
                                <span
                                  className={`text-sm font-semibold ${
                                    paymentData.paymentCount > 0 && paymentData.paidCount / paymentData.paymentCount >= 0.8
                                      ? "text-green-600"
                                      : "text-orange-600"
                                  }`}
                                >
                                  {paymentData.paymentCount > 0 ? ((paymentData.paidCount / paymentData.paymentCount) * 100).toFixed(1) : 0}
                                  %
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${
                                    paymentData.paymentCount > 0 && paymentData.paidCount / paymentData.paymentCount >= 0.8
                                      ? "bg-green-500"
                                      : "bg-orange-500"
                                  }`}
                                  style={{
                                    width: `${
                                      paymentData.paymentCount > 0 ? (paymentData.paidCount / paymentData.paymentCount) * 100 : 0
                                    }%`,
                                  }}
                                ></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-gray-600">出荷完了率</span>
                                <span
                                  className={`text-sm font-semibold ${
                                    salesData.salesCount > 0 && salesData.shippedSalesCount / salesData.salesCount >= 0.8
                                      ? "text-green-600"
                                      : "text-orange-600"
                                  }`}
                                >
                                  {salesData.salesCount > 0 ? ((salesData.shippedSalesCount / salesData.salesCount) * 100).toFixed(1) : 0}%
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${
                                    salesData.salesCount > 0 && salesData.shippedSalesCount / salesData.salesCount >= 0.8
                                      ? "bg-green-500"
                                      : "bg-orange-500"
                                  }`}
                                  style={{
                                    width: `${salesData.salesCount > 0 ? (salesData.shippedSalesCount / salesData.salesCount) * 100 : 0}%`,
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
            </div>
          )}
          {currentPage === "systemSettings" && renderSystemSettings()}
        </div>
      </main>

      {/* モーダル */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-2 md:p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 md:p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h3 className="text-xl font-bold text-gray-800">{editingSupplier ? t.editSupplier : t.addSupplier}</h3>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-4 md:p-6 space-y-4 md:space-y-6">
              {validationError && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                  <div className="flex items-center">
                    <AlertCircle className="text-red-500 mr-2" size={20} />
                    <p className="text-sm text-red-700 font-medium">{validationError}</p>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.supplier} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="例: Nguyen Trading Co., Ltd."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.type} <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value as "material" | "processing" | "logistics" | "customer" | "other" })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="material">{t.material}</option>
                    <option value="processing">{t.processing}</option>
                    <option value="logistics">{t.logistics}</option>
                    <option value="customer">{t.customer}</option>
                    <option value="other">{t.other}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.region} <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value as "vietnam" | "japan" | "thailand" | "china" })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="vietnam">{t.vietnam}</option>
                    <option value="japan">{t.japan}</option>
                    <option value="thailand">{t.thailand}</option>
                    <option value="china">{t.china}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.currency} <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.currency}
                    onChange={(e) => setFormData({ ...formData, currency: e.target.value as "USD" | "JPY" | "VND" })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="USD">USD</option>
                    <option value="JPY">JPY</option>
                    <option value="VND">VND</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.paymentTerms} <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.paymentTerms}
                    onChange={(e) =>
                      setFormData({ ...formData, paymentTerms: e.target.value as "monthEnd" | "upon7Days" | "upon14Days" | "upon30Days" })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="monthEnd">{t.monthEnd}</option>
                    <option value="upon7Days">{t.upon7Days}</option>
                    <option value="upon14Days">{t.upon14Days}</option>
                    <option value="upon30Days">{t.upon30Days}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.status}</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as "active" | "inactive" })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">{t.active}</option>
                  <option value="inactive">{t.inactive}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.remarks}</label>
                <textarea
                  value={formData.remarks}
                  onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="備考を入力してください"
                />
              </div>
            </div>

            <div className="p-4 md:p-6 border-t border-gray-200 flex items-center justify-end gap-2 md:gap-3 bg-gray-50">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 md:px-6 py-2 text-gray-700 hover:bg-gray-100 border border-gray-300 rounded-lg font-medium transition-colors text-sm md:text-base"
              >
                {t.cancel}
              </button>
              <button
                onClick={handleSave}
                className="px-4 md:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 font-medium transition-colors text-sm md:text-base"
              >
                <Save size={18} />
                {t.save}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 発注登録・編集モーダル */}
      {showOrderModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h3 className="text-xl font-bold text-gray-800">{editingOrder ? t.editOrder : t.addOrder}</h3>
              <button onClick={() => setShowOrderModal(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-4 md:p-6 space-y-4 md:space-y-6">
              {orderValidationError && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                  <div className="flex items-center">
                    <AlertCircle className="text-red-500 mr-2" size={20} />
                    <p className="text-sm text-red-700 font-medium">{orderValidationError}</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.orderDate} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={orderFormData.orderDate}
                    onChange={(e) => setOrderFormData({ ...orderFormData, orderDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.deliveryDate} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={orderFormData.deliveryDate}
                    onChange={(e) => setOrderFormData({ ...orderFormData, deliveryDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.product} <span className="text-red-500">*</span>
                </label>
                <select
                  value={orderFormData.productId}
                  onChange={(e) => {
                    const selectedItem = purchaseItems.find((p) => p.id === e.target.value);
                    if (selectedItem) {
                      setOrderFormData({
                        ...orderFormData,
                        productId: e.target.value,
                        unitPrice: selectedItem.standardPrice,
                        currency: selectedItem.currency,
                        supplierId: selectedItem.supplierId,
                      });
                    } else {
                      setOrderFormData({ ...orderFormData, productId: e.target.value });
                    }
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">{lang === "ja" ? "品目を選択してください" : "Chọn hàng mua"}</option>
                  {purchaseItems
                    .filter((p) => {
                      if (!orderFormData.supplierId) return p.status === "active";
                      return p.status === "active" && p.supplierId === orderFormData.supplierId;
                    })
                    .map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.productCode} - {p.productName}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.supplier} <span className="text-red-500">*</span>
                </label>
                <select
                  value={orderFormData.supplierId}
                  onChange={(e) => {
                    const newSupplierId = e.target.value;
                    setOrderFormData({
                      ...orderFormData,
                      supplierId: newSupplierId,
                      // 仕入先を変更したら、品目が新しい仕入先と一致しない場合はクリア
                      productId: orderFormData.productId
                        ? (() => {
                            const currentItem = purchaseItems.find((p) => p.id === orderFormData.productId);
                            return currentItem && currentItem.supplierId === newSupplierId ? orderFormData.productId : "";
                          })()
                        : "",
                    });
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">{lang === "ja" ? "選択してください" : "Chọn nhà cung cấp"}</option>
                  {(() => {
                    // 品目が選択されている場合は、その品目の仕入先のみを表示
                    if (orderFormData.productId) {
                      const selectedItem = purchaseItems.find((p) => p.id === orderFormData.productId);
                      if (!selectedItem) return null;
                      return suppliers
                        .filter((s) => s.id === selectedItem.supplierId && s.status === "active")
                        .map((supplier) => (
                          <option key={supplier.id} value={supplier.id}>
                            {supplier.name}
                          </option>
                        ));
                    }
                    // 品目が未選択の場合は、材料・加工の仕入先をすべて表示
                    return suppliers
                      .filter((s) => (s.type === "material" || s.type === "processing") && s.status === "active")
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((supplier) => (
                        <option key={supplier.id} value={supplier.id}>
                          {supplier.name}
                        </option>
                      ));
                  })()}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.quantity} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={orderFormData.quantity}
                    onChange={(e) => setOrderFormData({ ...orderFormData, quantity: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="1000"
                    min="0"
                    step="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.unitPrice} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={orderFormData.unitPrice}
                    onChange={(e) => setOrderFormData({ ...orderFormData, unitPrice: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="5.2"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.currency} <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={orderFormData.currency}
                    onChange={(e) => setOrderFormData({ ...orderFormData, currency: e.target.value as "USD" | "JPY" | "VND" })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="USD">USD</option>
                    <option value="JPY">JPY</option>
                    <option value="VND">VND</option>
                  </select>
                </div>
              </div>

              {orderFormData.quantity && orderFormData.unitPrice && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-700">{t.totalAmount}:</span>
                    <span className="text-xl font-bold text-blue-800">
                      {orderFormData.currency === "VND"
                        ? `${(Number(orderFormData.quantity) * Number(orderFormData.unitPrice)).toLocaleString()} VND`
                        : orderFormData.currency === "JPY"
                        ? `¥${(Number(orderFormData.quantity) * Number(orderFormData.unitPrice)).toLocaleString()}`
                        : `${(Number(orderFormData.quantity) * Number(orderFormData.unitPrice)).toLocaleString()}`}
                    </span>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.remarks}</label>
                <textarea
                  value={orderFormData.remarks}
                  onChange={(e) => setOrderFormData({ ...orderFormData, remarks: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="備考を入力してください"
                />
              </div>

              <div className="border-t pt-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">{lang === "ja" ? "ステータス" : "Trạng thái"}</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={orderFormData.ordered}
                      onChange={(e) => setOrderFormData({ ...orderFormData, ordered: e.target.checked })}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{lang === "ja" ? "発注済み" : "Đã đặt hàng"}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={orderFormData.delivered}
                      onChange={(e) => setOrderFormData({ ...orderFormData, delivered: e.target.checked })}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{lang === "ja" ? "納品済み" : "Đã giao hàng"}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={orderFormData.paid}
                      onChange={(e) => setOrderFormData({ ...orderFormData, paid: e.target.checked })}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{lang === "ja" ? "支払い済み" : "Đã thanh toán"}</span>
                  </label>
                </div>
              </div>

              <div className="border-t pt-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">{lang === "ja" ? "書類状況" : "Trạng thái tài liệu"}</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={orderFormData.purchaseOrderSent}
                      onChange={(e) => setOrderFormData({ ...orderFormData, purchaseOrderSent: e.target.checked })}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{lang === "ja" ? "発注書送付" : "Gửi đơn hàng"}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={orderFormData.deliveryNoteReceived}
                      onChange={(e) => setOrderFormData({ ...orderFormData, deliveryNoteReceived: e.target.checked })}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{lang === "ja" ? "納品書受領" : "Nhận giao hàng"}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={orderFormData.invoiceReceived}
                      onChange={(e) => setOrderFormData({ ...orderFormData, invoiceReceived: e.target.checked })}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{lang === "ja" ? "請求書受領" : "Nhận hóa đơn"}</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="p-4 md:p-6 border-t border-gray-200 flex items-center justify-end gap-2 md:gap-3 bg-gray-50">
              <button
                onClick={() => setShowOrderModal(false)}
                className="px-4 md:px-6 py-2 text-gray-700 hover:bg-gray-100 border border-gray-300 rounded-lg font-medium transition-colors text-sm md:text-base"
              >
                {t.cancel}
              </button>
              <button
                onClick={handleOrderSave}
                className="px-4 md:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 font-medium transition-colors text-sm md:text-base"
              >
                <Save size={18} />
                {t.save}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 発注削除確認モーダル */}
      {showOrderDeleteConfirm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
                <AlertCircle className="text-red-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 text-center mb-2">{t.deleteConfirmTitle}</h3>
              <p className="text-gray-600 text-center mb-6">{t.deleteConfirmMessage}</p>
              <div className="flex gap-3">
                <button
                  onClick={handleOrderDeleteCancel}
                  className="flex-1 px-6 py-3 text-gray-700 hover:bg-gray-100 border border-gray-300 rounded-lg font-medium transition-colors"
                >
                  {t.cancel}
                </button>
                <button
                  onClick={handleOrderDeleteConfirm}
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors"
                >
                  {t.delete}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 売上登録・編集モーダル */}
      {showSaleModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h3 className="text-xl font-bold text-gray-800">{editingSale ? t.editSale : t.addSale}</h3>
              <button onClick={() => setShowSaleModal(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-4 md:p-6 space-y-4 md:space-y-6">
              {saleValidationError && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                  <div className="flex items-center">
                    <AlertCircle className="text-red-500 mr-2" size={20} />
                    <p className="text-sm text-red-700 font-medium">{saleValidationError}</p>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.poNumber} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={saleFormData.poNumber}
                  onChange={(e) => setSaleFormData({ ...saleFormData, poNumber: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="PO-2025-001"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.saleDate} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={saleFormData.saleDate}
                    onChange={(e) => setSaleFormData({ ...saleFormData, saleDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.deliveryDate} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={saleFormData.deliveryDate}
                    onChange={(e) => setSaleFormData({ ...saleFormData, deliveryDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.customerName} <span className="text-red-500">*</span>
                </label>
                <select
                  value={saleFormData.customerId}
                  onChange={(e) => setSaleFormData({ ...saleFormData, customerId: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">{lang === "ja" ? "選択してください" : "Chọn khách hàng"}</option>
                  {suppliers
                    .filter((s) => s.type === "customer" && s.status === "active")
                    .map((customer) => (
                      <option key={customer.id} value={customer.id}>
                        {customer.name}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.product} <span className="text-red-500">*</span>
                </label>
                <select
                  value={saleFormData.productId}
                  onChange={(e) => {
                    const selectedProduct = products.find((p) => p.id === e.target.value);
                    if (selectedProduct) {
                      setSaleFormData({
                        ...saleFormData,
                        productId: e.target.value,
                        unitPrice: selectedProduct.standardPrice,
                        currency: selectedProduct.currency,
                      });
                    } else {
                      setSaleFormData({ ...saleFormData, productId: e.target.value });
                    }
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">{lang === "ja" ? "製品を選択してください" : "Chọn sản phẩm"}</option>
                  {products
                    .filter((p) => p.status === "active")
                    .map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.productCode} - {p.productName}
                      </option>
                    ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.orderQuantity} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={saleFormData.quantity}
                    onChange={(e) => setSaleFormData({ ...saleFormData, quantity: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="2000"
                    min="0"
                    step="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.unitPrice} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={saleFormData.unitPrice}
                    onChange={(e) => setSaleFormData({ ...saleFormData, unitPrice: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="2200"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.currency} <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={saleFormData.currency}
                    onChange={(e) => setSaleFormData({ ...saleFormData, currency: e.target.value as "USD" | "JPY" | "VND" })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="USD">USD</option>
                    <option value="JPY">JPY</option>
                    <option value="VND">VND</option>
                  </select>
                </div>
              </div>

              {saleFormData.quantity && saleFormData.unitPrice && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-700">{t.totalAmount}:</span>
                    <span className="text-xl font-bold text-blue-800">
                      {saleFormData.currency === "VND"
                        ? `${(Number(saleFormData.quantity) * Number(saleFormData.unitPrice)).toLocaleString()} VND`
                        : saleFormData.currency === "JPY"
                        ? `¥${(Number(saleFormData.quantity) * Number(saleFormData.unitPrice)).toLocaleString()}`
                        : `$${(Number(saleFormData.quantity) * Number(saleFormData.unitPrice)).toLocaleString()}`}
                    </span>
                  </div>
                </div>
              )}

              {/* 自動計算項目の表示 */}
              {saleFormData.productId &&
                saleFormData.quantity > 0 &&
                (() => {
                  const selectedProduct = products.find((p) => p.id === saleFormData.productId);
                  if (!selectedProduct) return null;

                  const requiredMaterialAmount = selectedProduct.weight > 0 ? (saleFormData.quantity * selectedProduct.weight) / 1000 : 0;
                  const moldingTime =
                    selectedProduct.length > 0 && selectedProduct.speed > 0
                      ? (saleFormData.quantity * selectedProduct.length) / 1000 / selectedProduct.speed / 60
                      : 0;

                  return (
                    <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg space-y-3">
                      <h4 className="text-sm font-semibold text-gray-700">自動計算項目</h4>

                      {selectedProduct.materialIds.length > 0 && (
                        <div>
                          <p className="text-xs text-gray-600 mb-1">{t.materials}</p>
                          <div className="flex flex-wrap gap-2">
                            {selectedProduct.materialIds.map((matId) => {
                              const material = purchaseItems.find((item) => item.id === matId);
                              return material ? (
                                <span key={matId} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                  {material.productCode} - {material.productName}
                                </span>
                              ) : null;
                            })}
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-600">{t.requiredMaterialAmount}</p>
                          <p className="text-lg font-semibold text-gray-900">
                            {requiredMaterialAmount.toLocaleString()} {t.requiredMaterialUnit}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">{t.moldingTime}</p>
                          <p className="text-lg font-semibold text-gray-900">
                            {moldingTime.toFixed(2)} {t.timeUnit}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })()}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.remarks}</label>
                <textarea
                  value={saleFormData.remarks}
                  onChange={(e) => setSaleFormData({ ...saleFormData, remarks: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="備考を入力してください"
                />
              </div>

              <div className="border-t pt-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">{lang === "ja" ? "ステータス" : "Trạng thái"}</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={saleFormData.shipped}
                      onChange={(e) => setSaleFormData({ ...saleFormData, shipped: e.target.checked })}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{lang === "ja" ? "出荷済み" : "Đã xuất hàng"}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={saleFormData.delivered}
                      onChange={(e) => setSaleFormData({ ...saleFormData, delivered: e.target.checked })}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{lang === "ja" ? "納品済み" : "Đã giao hàng"}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={saleFormData.paid}
                      onChange={(e) => setSaleFormData({ ...saleFormData, paid: e.target.checked })}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{lang === "ja" ? "入金済み" : "Đã nhận tiền"}</span>
                  </label>
                </div>
              </div>

              <div className="border-t pt-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">{lang === "ja" ? "書類状況" : "Trạng thái tài liệu"}</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={saleFormData.purchaseOrderReceived}
                      onChange={(e) => setSaleFormData({ ...saleFormData, purchaseOrderReceived: e.target.checked })}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{lang === "ja" ? "発注書受領" : "Nhận đơn hàng"}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={saleFormData.deliveryNoteSent}
                      onChange={(e) => setSaleFormData({ ...saleFormData, deliveryNoteSent: e.target.checked })}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{lang === "ja" ? "納品書送付" : "Gửi phiếu giao hàng"}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={saleFormData.invoiceSent}
                      onChange={(e) => setSaleFormData({ ...saleFormData, invoiceSent: e.target.checked })}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{lang === "ja" ? "請求書送付" : "Gửi hóa đơn"}</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="p-4 md:p-6 border-t border-gray-200 flex items-center justify-end gap-2 md:gap-3 bg-gray-50">
              <button
                onClick={() => setShowSaleModal(false)}
                className="px-4 md:px-6 py-2 text-gray-700 hover:bg-gray-100 border border-gray-300 rounded-lg font-medium transition-colors text-sm md:text-base"
              >
                {t.cancel}
              </button>
              <button
                onClick={handleSaleSave}
                className="px-4 md:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 font-medium transition-colors text-sm md:text-base"
              >
                <Save size={18} />
                {t.save}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 売上削除確認モーダル */}
      {showSaleDeleteConfirm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
                <AlertCircle className="text-red-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 text-center mb-2">{t.deleteConfirmTitle}</h3>
              <p className="text-gray-600 text-center mb-6">{t.deleteConfirmMessage}</p>
              <div className="flex gap-3">
                <button
                  onClick={handleSaleDeleteCancel}
                  className="flex-1 px-6 py-3 text-gray-700 hover:bg-gray-100 border border-gray-300 rounded-lg font-medium transition-colors"
                >
                  {t.cancel}
                </button>
                <button
                  onClick={handleSaleDeleteConfirm}
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors"
                >
                  {t.delete}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 支払い登録・編集モーダル */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-800">{editingPayment ? t.editPayment : t.addPayment}</h2>
            </div>

            <div className="p-4 md:p-6 space-y-4 md:space-y-6">
              {paymentValidationError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="text-red-600 shrink-0 mt-0.5" size={20} />
                  <p className="text-sm text-red-800">{paymentValidationError}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.category}</label>
                  <select
                    value={paymentFormData.category}
                    onChange={(e) =>
                      setPaymentFormData({
                        ...paymentFormData,
                        category: e.target.value as "rent" | "utilities" | "salary" | "other",
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="rent">{t.rent}</option>
                    <option value="utilities">{t.utilities}</option>
                    <option value="salary">{t.salary}</option>
                    <option value="other">{t.other}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.description} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={paymentFormData.description}
                    onChange={(e) => setPaymentFormData({ ...paymentFormData, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t.description}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.amount} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={paymentFormData.amount}
                    onChange={(e) => setPaymentFormData({ ...paymentFormData, amount: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.currency}</label>
                  <select
                    value={paymentFormData.currency}
                    onChange={(e) =>
                      setPaymentFormData({
                        ...paymentFormData,
                        currency: e.target.value as "USD" | "JPY" | "VND",
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="USD">USD</option>
                    <option value="JPY">JPY</option>
                    <option value="VND">VND</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.paymentMethod}</label>
                  <select
                    value={paymentFormData.paymentMethod}
                    onChange={(e) =>
                      setPaymentFormData({
                        ...paymentFormData,
                        paymentMethod: e.target.value as "bank" | "cash" | "card",
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="bank">{t.bank}</option>
                    <option value="cash">{t.cash}</option>
                    <option value="card">{t.card}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.paymentDate}</label>
                  <input
                    type="date"
                    value={paymentFormData.paymentDate}
                    onChange={(e) => setPaymentFormData({ ...paymentFormData, paymentDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.status}</label>
                <select
                  value={paymentFormData.status}
                  onChange={(e) => setPaymentFormData({ ...paymentFormData, status: e.target.value as "pending" | "paid" })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="pending">{t.paymentStatusPending}</option>
                  <option value="paid">{t.paymentStatusPaid}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.remarks}</label>
                <textarea
                  value={paymentFormData.remarks}
                  onChange={(e) => setPaymentFormData({ ...paymentFormData, remarks: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder={t.remarks}
                />
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 px-6 py-4 rounded-b-2xl flex gap-3">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 px-6 py-3 text-gray-700 hover:bg-gray-200 border border-gray-300 rounded-lg font-medium transition-colors"
              >
                {t.cancel}
              </button>
              <button
                onClick={handlePaymentSave}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
              >
                <Save size={18} />
                {t.save}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 支払い削除確認モーダル */}
      {showPaymentDeleteConfirm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
                <AlertCircle className="text-red-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 text-center mb-2">{t.deleteConfirmTitle}</h3>
              <p className="text-gray-600 text-center mb-6">{t.deleteConfirmMessage}</p>
              <div className="flex gap-3">
                <button
                  onClick={handlePaymentDeleteCancel}
                  className="flex-1 px-6 py-3 text-gray-700 hover:bg-gray-100 border border-gray-300 rounded-lg font-medium transition-colors"
                >
                  {t.cancel}
                </button>
                <button
                  onClick={handlePaymentDeleteConfirm}
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors"
                >
                  {t.delete}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 支払いマスタ登録・編集モーダル */}
      {showPaymentMasterModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-800">{editingPaymentMaster ? t.editPaymentMaster : t.addPaymentMaster}</h2>
            </div>

            <div className="p-4 md:p-6 space-y-4 md:space-y-6">
              {paymentMasterValidationError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="text-red-600 shrink-0 mt-0.5" size={20} />
                  <p className="text-sm text-red-800">{paymentMasterValidationError}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.category}</label>
                  <select
                    value={paymentMasterFormData.category}
                    onChange={(e) =>
                      setPaymentMasterFormData({
                        ...paymentMasterFormData,
                        category: e.target.value as "rent" | "utilities" | "salary" | "other",
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="rent">{t.rent}</option>
                    <option value="utilities">{t.utilities}</option>
                    <option value="salary">{t.salary}</option>
                    <option value="other">{t.other}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.description}</label>
                  <input
                    type="text"
                    value={paymentMasterFormData.description}
                    onChange={(e) => setPaymentMasterFormData({ ...paymentMasterFormData, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t.description}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isFixed"
                  checked={paymentMasterFormData.isFixed}
                  onChange={(e) =>
                    setPaymentMasterFormData({
                      ...paymentMasterFormData,
                      isFixed: e.target.checked,
                      fixedAmount: e.target.checked ? paymentMasterFormData.fixedAmount : 0,
                    })
                  }
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor="isFixed" className="text-sm font-medium text-gray-700">
                  {t.fixedCost}
                </label>
              </div>

              {paymentMasterFormData.isFixed && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t.fixedAmount}</label>
                    <input
                      type="number"
                      value={paymentMasterFormData.fixedAmount}
                      onChange={(e) => setPaymentMasterFormData({ ...paymentMasterFormData, fixedAmount: Number(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t.currency}</label>
                    <select
                      value={paymentMasterFormData.currency}
                      onChange={(e) =>
                        setPaymentMasterFormData({
                          ...paymentMasterFormData,
                          currency: e.target.value as "USD" | "JPY" | "VND",
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="USD">USD</option>
                      <option value="JPY">JPY</option>
                      <option value="VND">VND</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.paymentMethod}</label>
                  <select
                    value={paymentMasterFormData.paymentMethod}
                    onChange={(e) =>
                      setPaymentMasterFormData({
                        ...paymentMasterFormData,
                        paymentMethod: e.target.value as "bank" | "cash" | "card",
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="bank">{t.bank}</option>
                    <option value="cash">{t.cash}</option>
                    <option value="card">{t.card}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.paymentDay}</label>
                  <input
                    type="number"
                    value={paymentMasterFormData.paymentDay}
                    onChange={(e) => setPaymentMasterFormData({ ...paymentMasterFormData, paymentDay: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="1"
                    max="31"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.remarks}</label>
                <textarea
                  value={paymentMasterFormData.remarks}
                  onChange={(e) => setPaymentMasterFormData({ ...paymentMasterFormData, remarks: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder={t.remarks}
                />
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 px-6 py-4 rounded-b-2xl flex gap-3">
              <button
                onClick={() => setShowPaymentMasterModal(false)}
                className="flex-1 px-6 py-3 text-gray-700 hover:bg-gray-200 border border-gray-300 rounded-lg font-medium transition-colors"
              >
                {t.cancel}
              </button>
              <button
                onClick={handlePaymentMasterSave}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
              >
                {t.save}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 支払いマスタ削除確認モーダル */}
      {showPaymentMasterDeleteConfirm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
                <AlertCircle className="text-red-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 text-center mb-2">{lang === "ja" ? "削除の確認" : "Xác nhận xóa"}</h3>
              <p className="text-gray-600 text-center mb-6">
                {lang === "ja"
                  ? "本当に削除しますか？この操作は取り消せません。"
                  : "Bạn có chắc muốn xóa? Thao tác này không thể hoàn tác."}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handlePaymentMasterDeleteCancel}
                  className="flex-1 px-6 py-3 text-gray-700 hover:bg-gray-100 border border-gray-300 rounded-lg font-medium transition-colors"
                >
                  {t.cancel}
                </button>
                <button
                  onClick={handlePaymentMasterDeleteConfirm}
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors"
                >
                  {t.delete}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 削除確認モーダル */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
                <AlertCircle className="text-red-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 text-center mb-2">{lang === "ja" ? "削除の確認" : "Xác nhận xóa"}</h3>
              <p className="text-gray-600 text-center mb-6">
                {lang === "ja"
                  ? "本当に削除しますか？この操作は取り消せません。"
                  : "Bạn có chắc muốn xóa? Thao tác này không thể hoàn tác."}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleDeleteCancel}
                  className="flex-1 px-6 py-3 text-gray-700 hover:bg-gray-100 border border-gray-300 rounded-lg font-medium transition-colors"
                >
                  {t.cancel}
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors"
                >
                  {t.delete}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 発注品目マスタモーダル */}
      {showPurchaseItemModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-2 md:p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 md:p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                {editingPurchaseItem ? t.editPurchaseItem : t.addPurchaseItem}
              </h2>
              <button onClick={() => setShowPurchaseItemModal(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="p-4 md:p-6 space-y-4 md:space-y-6">
              {purchaseItemValidationError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{purchaseItemValidationError}</div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.productCode} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={purchaseItemFormData.productCode}
                    onChange={(e) => setPurchaseItemFormData({ ...purchaseItemFormData, productCode: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t.productCode}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.productName} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={purchaseItemFormData.productName}
                    onChange={(e) => setPurchaseItemFormData({ ...purchaseItemFormData, productName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t.productName}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.category}</label>
                  <select
                    value={purchaseItemFormData.category}
                    onChange={(e) =>
                      setPurchaseItemFormData({
                        ...purchaseItemFormData,
                        category: e.target.value as PurchaseItemFormData["category"],
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="raw_material">{t.raw_material}</option>
                    <option value="finished_goods">{t.finished_goods}</option>
                    <option value="semi_finished">{t.semi_finished}</option>
                    <option value="parts">{t.parts}</option>
                    <option value="other">{t.other}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.unit}</label>
                  <select
                    value={purchaseItemFormData.unit}
                    onChange={(e) =>
                      setPurchaseItemFormData({ ...purchaseItemFormData, unit: e.target.value as PurchaseItemFormData["unit"] })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="kg">{t.kg}</option>
                    <option value="ton">{t.ton}</option>
                    <option value="piece">{t.piece}</option>
                    <option value="box">{t.box}</option>
                    <option value="liter">{t.liter}</option>
                    <option value="meter">{t.meter}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.standardPrice}</label>
                  <input
                    type="number"
                    value={purchaseItemFormData.standardPrice}
                    onChange={(e) => setPurchaseItemFormData({ ...purchaseItemFormData, standardPrice: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.currency}</label>
                  <select
                    value={purchaseItemFormData.currency}
                    onChange={(e) =>
                      setPurchaseItemFormData({ ...purchaseItemFormData, currency: e.target.value as "USD" | "JPY" | "VND" })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="USD">USD</option>
                    <option value="JPY">JPY</option>
                    <option value="VND">VND</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {lang === "ja" ? "仕入先" : "Nhà cung cấp"} <span className="text-red-500">*</span>
                </label>
                <select
                  value={purchaseItemFormData.supplierId}
                  onChange={(e) => setPurchaseItemFormData({ ...purchaseItemFormData, supplierId: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">{lang === "ja" ? "仕入先を選択" : "Chọn nhà cung cấp"}</option>
                  {suppliers
                    .filter((s) => s.type === "material" || s.type === "processing")
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((supplier) => (
                      <option key={supplier.id} value={supplier.id}>
                        {supplier.name}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.status}</label>
                <select
                  value={purchaseItemFormData.status}
                  onChange={(e) => setPurchaseItemFormData({ ...purchaseItemFormData, status: e.target.value as "active" | "inactive" })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">{t.active}</option>
                  <option value="inactive">{t.inactive}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.remarks}</label>
                <textarea
                  value={purchaseItemFormData.remarks}
                  onChange={(e) => setPurchaseItemFormData({ ...purchaseItemFormData, remarks: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t.remarks}
                />
              </div>
            </div>
            <div className="p-4 md:p-6 border-t border-gray-200 flex gap-3 sticky bottom-0 bg-white">
              <button
                onClick={() => setShowPurchaseItemModal(false)}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
              >
                {t.cancel}
              </button>
              <button
                onClick={handlePurchaseItemSave}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
              >
                {t.save}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 発注品目マスタ削除確認モーダル */}
      {showPurchaseItemDeleteConfirm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">{t.deleteConfirmTitle}</h3>
              <p className="text-gray-600 mb-6">{t.deleteConfirmMessage}</p>
              <div className="flex gap-3">
                <button
                  onClick={handlePurchaseItemDeleteCancel}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                >
                  {t.cancel}
                </button>
                <button
                  onClick={handlePurchaseItemDeleteConfirm}
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors"
                >
                  {t.delete}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 製品マスタモーダル */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-2 md:p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 md:p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">{editingProduct ? t.editProduct : t.addProduct}</h2>
              <button onClick={() => setShowProductModal(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="p-4 md:p-6 space-y-4 md:space-y-6">
              {productValidationError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{productValidationError}</div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.productCode} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={productFormData.productCode}
                    onChange={(e) => setProductFormData({ ...productFormData, productCode: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t.productCode}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.productName} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={productFormData.productName}
                    onChange={(e) => setProductFormData({ ...productFormData, productName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t.productName}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.category}</label>
                  <select
                    value={productFormData.category}
                    onChange={(e) =>
                      setProductFormData({
                        ...productFormData,
                        category: e.target.value as ProductFormData["category"],
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="raw_material">{t.raw_material}</option>
                    <option value="finished_goods">{t.finished_goods}</option>
                    <option value="semi_finished">{t.semi_finished}</option>
                    <option value="parts">{t.parts}</option>
                    <option value="other">{t.other}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.unit}</label>
                  <select
                    value={productFormData.unit}
                    onChange={(e) => setProductFormData({ ...productFormData, unit: e.target.value as ProductFormData["unit"] })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="kg">{t.kg}</option>
                    <option value="ton">{t.ton}</option>
                    <option value="piece">{t.piece}</option>
                    <option value="box">{t.box}</option>
                    <option value="liter">{t.liter}</option>
                    <option value="meter">{t.meter}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.standardPrice}</label>
                  <input
                    type="number"
                    value={productFormData.standardPrice}
                    onChange={(e) => setProductFormData({ ...productFormData, standardPrice: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.currency}</label>
                  <select
                    value={productFormData.currency}
                    onChange={(e) => setProductFormData({ ...productFormData, currency: e.target.value as "USD" | "JPY" | "VND" })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="USD">USD</option>
                    <option value="JPY">JPY</option>
                    <option value="VND">VND</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.status}</label>
                <select
                  value={productFormData.status}
                  onChange={(e) => setProductFormData({ ...productFormData, status: e.target.value as "active" | "inactive" })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">{t.active}</option>
                  <option value="inactive">{t.inactive}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.remarks}</label>
                <textarea
                  value={productFormData.remarks}
                  onChange={(e) => setProductFormData({ ...productFormData, remarks: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t.remarks}
                />
              </div>

              {/* 製品詳細情報 */}
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">製品詳細</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.weight} ({t.weightUnit})
                    </label>
                    <input
                      type="number"
                      value={productFormData.weight}
                      onChange={(e) => setProductFormData({ ...productFormData, weight: parseFloat(e.target.value) || 0 })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      step="0.01"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.lengthField} ({t.lengthUnit})
                    </label>
                    <input
                      type="number"
                      value={productFormData.length}
                      onChange={(e) => setProductFormData({ ...productFormData, length: parseFloat(e.target.value) || 0 })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      step="0.01"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.speed} ({t.speedUnit})
                    </label>
                    <input
                      type="number"
                      value={productFormData.speed}
                      onChange={(e) => setProductFormData({ ...productFormData, speed: parseFloat(e.target.value) || 0 })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      step="0.01"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.materials}</label>
                  <div className="space-y-2">
                    {purchaseItems.map((item) => (
                      <label key={item.id} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                        <input
                          type="checkbox"
                          checked={productFormData.materialIds.includes(item.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setProductFormData({
                                ...productFormData,
                                materialIds: [...productFormData.materialIds, item.id],
                              });
                            } else {
                              setProductFormData({
                                ...productFormData,
                                materialIds: productFormData.materialIds.filter((id) => id !== item.id),
                              });
                            }
                          }}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">
                          {item.productCode} - {item.productName}
                        </span>
                      </label>
                    ))}
                  </div>
                  {productFormData.materialIds.length === 0 && <p className="text-sm text-gray-500 mt-2">材料が選択されていません</p>}
                </div>
              </div>
            </div>
            <div className="p-4 md:p-6 border-t border-gray-200 flex gap-3 sticky bottom-0 bg-white">
              <button
                onClick={() => setShowProductModal(false)}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
              >
                {t.cancel}
              </button>
              <button
                onClick={handleProductSave}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
              >
                {t.save}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 製品マスタ削除確認モーダル */}
      {showProductDeleteConfirm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">{t.deleteConfirmTitle}</h3>
              <p className="text-gray-600 mb-6">{t.deleteConfirmMessage}</p>
              <div className="flex gap-3">
                <button
                  onClick={handleProductDeleteCancel}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                >
                  {t.cancel}
                </button>
                <button
                  onClick={handleProductDeleteConfirm}
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors"
                >
                  {t.delete}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
