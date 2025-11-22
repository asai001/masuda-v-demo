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
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [validationError, setValidationError] = useState("");
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

  // 支払いマスタ関連のstate
  const [showPaymentMasterModal, setShowPaymentMasterModal] = useState(false);
  const [editingPaymentMaster, setEditingPaymentMaster] = useState<PaymentMaster | null>(null);
  const [showPaymentMasterDeleteConfirm, setShowPaymentMasterDeleteConfirm] = useState(false);
  const [deletePaymentMasterTargetId, setDeletePaymentMasterTargetId] = useState<string>("");
  const [paymentMasterValidationError, setPaymentMasterValidationError] = useState("");
  const [paymentMasterSearchQuery, setPaymentMasterSearchQuery] = useState("");
  const [paymentMasterFilterCategory, setPaymentMasterFilterCategory] = useState("all");

  // 支払い実績関連のstate
  const [selectedYearMonth, setSelectedYearMonth] = useState("2025-12"); // デフォルトは2025年12月
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

  const translations = {
    ja: {
      dashboard: "ダッシュボード",
      suppliers: "取引先マスタ",
      orders: "発注登録",
      sales: "売上計上",
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
      saleMaster: "売上管理",
      saleList: "売上一覧",
      addSale: "新規売上",
      editSale: "売上編集",
      saleDate: "売上日",
      customerName: "顧客名",
      pending: "未出荷",
      shipped: "出荷済み",
      totalSalesCount: "売上件数",
      pendingSales: "未出荷",
      shippedSales: "出荷済み",
      deliveredSales: "納品済み",
      usa: "米国",
      deleteConfirmTitle: "削除の確認",
      deleteConfirmMessage: "本当に削除しますか？この操作は取り消せません。",
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
    },
    vi: {
      dashboard: "Bảng điều khiển",
      suppliers: "Nhà cung cấp",
      orders: "Đặt hàng",
      sales: "Doanh thu",
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
      saleMaster: "Quản lý doanh thu",
      saleList: "Danh sách doanh thu",
      addSale: "Doanh thu mới",
      editSale: "Chỉnh sửa doanh thu",
      saleDate: "Ngày bán",
      customerName: "Tên khách hàng",
      pending: "Chưa giao",
      shipped: "Đã xuất",
      totalSalesCount: "Số lượng doanh thu",
      pendingSales: "Chưa giao",
      shippedSales: "Đã xuất",
      deliveredSales: "Đã giao",
      usa: "Mỹ",
      deleteConfirmTitle: "Xác nhận xóa",
      deleteConfirmMessage: "Bạn có chắc muốn xóa? Thao tác này không thể hoàn tác.",
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

  const [formData, setFormData] = useState<FormData>({
    name: "",
    type: "material",
    region: "vietnam",
    currency: "USD",
    paymentTerms: "monthEnd",
    status: "active",
    remarks: "",
  });

  const [orders, setOrders] = useState<Order[]>([
    {
      id: "o-001",
      incrementalId: 1,
      orderDate: "2025-11-15",
      supplierId: "s-001",
      product: "PVC材料 A-123",
      quantity: 1000,
      unitPrice: 5.2,
      currency: "USD",
      deliveryDate: "2025-11-25",
      status: "ordered",
      remarks: "通常発注",
    },
    {
      id: "o-002",
      incrementalId: 2,
      orderDate: "2025-11-18",
      supplierId: "s-002",
      product: "ポリエチレン PE-500",
      quantity: 500,
      unitPrice: 85000,
      currency: "VND",
      deliveryDate: "2025-11-28",
      status: "ordered",
      remarks: "急ぎ",
    },
    {
      id: "o-003",
      incrementalId: 3,
      orderDate: "2025-11-10",
      supplierId: "s-003",
      product: "添加剤 AD-200",
      quantity: 200,
      unitPrice: 12.5,
      currency: "USD",
      deliveryDate: "2025-11-20",
      status: "delivered",
      remarks: "納品完了",
    },
  ]);

  const [orderFormData, setOrderFormData] = useState<OrderFormData>({
    orderDate: "",
    supplierId: "",
    product: "",
    quantity: 0,
    unitPrice: 0,
    currency: "USD",
    deliveryDate: "",
    status: "ordered",
    remarks: "",
  });

  // 売上データ
  const [sales, setSales] = useState<Sale[]>([
    {
      id: "sl-001",
      incrementalId: 1,
      saleDate: "2025-11-15",
      customerId: "s-006",
      product: "ビニール製品 VP-100",
      quantity: 2000,
      unitPrice: 2200,
      currency: "JPY",
      deliveryDate: "2025-11-25",
      status: "shipped",
      remarks: "定期取引",
    },
    {
      id: "sl-002",
      incrementalId: 2,
      saleDate: "2025-11-18",
      customerId: "s-007",
      product: "シート材 SH-200",
      quantity: 1500,
      unitPrice: 1800,
      currency: "JPY",
      deliveryDate: "2025-11-28",
      status: "pending",
      remarks: "急ぎ対応",
    },
    {
      id: "sl-003",
      incrementalId: 3,
      saleDate: "2025-11-10",
      customerId: "s-008",
      product: "成形品 MO-300",
      quantity: 800,
      unitPrice: 3500,
      currency: "JPY",
      deliveryDate: "2025-11-20",
      status: "delivered",
      remarks: "納品完了",
    },
  ]);

  const [saleFormData, setSaleFormData] = useState<SaleFormData>({
    saleDate: "",
    customerId: "",
    product: "",
    quantity: 0,
    unitPrice: 0,
    currency: "JPY",
    deliveryDate: "",
    status: "pending",
    remarks: "",
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

  const recentActivities = [
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
  ];

  const alerts = [
    { id: 1, type: "abnormalPrice", message: "Vietnam Plastics Ltd. - ポリエチレンの単価が前回比13%上昇", severity: "high" as const },
    { id: 2, type: "newSupplier", message: "新規仕入先: Saigon Materials (承認待ち)", severity: "medium" as const },
    { id: 3, type: "overduePayment", message: "Nguyen Trading Co.への支払いが2日遅延", severity: "high" as const },
  ];

  const menuItems = [
    { icon: LayoutDashboard, label: t.dashboard, page: "dashboard" },
    { icon: Users, label: t.suppliers, page: "suppliers" },
    { icon: ShoppingCart, label: t.orders, page: "orders" },
    { icon: TrendingUp, label: t.sales, page: "sales" },
    { icon: DollarSign, label: t.paymentManagement, page: "payments" },
    { icon: DollarSign, label: t.paymentMasterMenu, page: "paymentMaster" },
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
    } else {
      const newSupplier = {
        id,
        incrementalId: suppliers.length > 0 ? Math.max(...suppliers.map((s) => s.incrementalId)) + 1 : 1,
        ...formData,
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
      };
      setSuppliers([...suppliers, newSupplier]);
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
      setSuppliers(suppliers.filter((s) => s.id !== deleteTargetId));
      setShowDeleteConfirm(false);
      setDeleteTargetId(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
    setDeleteTargetId(null);
  };

  // 発注関連の関数
  // 発注関連の型定義
  interface Order {
    id: string;
    incrementalId: number;
    orderDate: string;
    supplierId: string;
    product: string;
    quantity: number;
    unitPrice: number;
    currency: "USD" | "JPY" | "VND";
    deliveryDate: string;
    status: "ordered" | "delivered" | "cancelled";
    remarks: string;
  }

  interface OrderFormData {
    orderDate: string;
    supplierId: string;
    product: string;
    quantity: number;
    unitPrice: number;
    currency: "USD" | "JPY" | "VND";
    deliveryDate: string;
    status: "ordered" | "delivered" | "cancelled";
    remarks: string;
  }

  interface Sale {
    id: string;
    incrementalId: number;
    saleDate: string;
    customerId: string;
    product: string;
    quantity: number;
    unitPrice: number;
    currency: "USD" | "JPY" | "VND";
    deliveryDate: string;
    status: "pending" | "shipped" | "delivered" | "cancelled";
    remarks: string;
  }

  interface SaleFormData {
    saleDate: string;
    customerId: string;
    product: string;
    quantity: number;
    unitPrice: number;
    currency: "USD" | "JPY" | "VND";
    deliveryDate: string;
    status: "pending" | "shipped" | "delivered" | "cancelled";
    remarks: string;
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
        product: order.product,
        quantity: order.quantity,
        unitPrice: order.unitPrice,
        currency: order.currency,
        deliveryDate: order.deliveryDate,
        status: order.status,
        remarks: order.remarks,
      });
    } else {
      setEditingOrder(null);
      const today = new Date().toISOString().split("T")[0];
      setOrderFormData({
        orderDate: today,
        supplierId: "",
        product: "",
        quantity: 0,
        unitPrice: 0,
        currency: "USD",
        deliveryDate: "",
        status: "ordered",
        remarks: "",
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
    if (!orderFormData.product || !orderFormData.product.trim()) {
      setOrderValidationError(lang === "ja" ? "品目/品番を入力してください" : "Vui lòng nhập sản phẩm/mã");
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
      product: orderFormData.product.trim(),
      quantity: Number(orderFormData.quantity),
      unitPrice: Number(orderFormData.unitPrice),
      currency: orderFormData.currency,
      deliveryDate: orderFormData.deliveryDate,
      status: orderFormData.status,
      remarks: orderFormData.remarks,
    };

    const incrementalId = orders.length > 0 ? Math.max(...orders.map((o) => o.incrementalId)) + 1 : 1;
    if (editingOrder) {
      setOrders(orders.map((o) => (o.id === editingOrder.id ? { ...o, ...orderData } : o)));
    } else {
      const newOrder = {
        id: `o-${String(incrementalId).padStart(3, "0")}`,
        incrementalId,
        ...orderData,
      };
      setOrders([...orders, newOrder]);
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
      setOrders(orders.filter((o) => o.id !== deleteOrderTargetId));
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
        saleDate: sale.saleDate,
        customerId: sale.customerId.toString(),
        product: sale.product,
        quantity: sale.quantity,
        unitPrice: sale.unitPrice,
        currency: sale.currency,
        deliveryDate: sale.deliveryDate,
        status: sale.status,
        remarks: sale.remarks,
      });
    } else {
      setEditingSale(null);
      const today = new Date().toISOString().split("T")[0];
      setSaleFormData({
        saleDate: today,
        customerId: "",
        product: "",
        quantity: 0,
        unitPrice: 0,
        currency: "JPY",
        deliveryDate: "",
        status: "pending",
        remarks: "",
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
    if (!saleFormData.product || !saleFormData.product.trim()) {
      setSaleValidationError(lang === "ja" ? "品目/品番を入力してください" : "Vui lòng nhập sản phẩm/mã");
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

    const saleData = {
      saleDate: saleFormData.saleDate,
      customerId: saleFormData.customerId,
      product: saleFormData.product.trim(),
      quantity: Number(saleFormData.quantity),
      unitPrice: Number(saleFormData.unitPrice),
      currency: saleFormData.currency,
      deliveryDate: saleFormData.deliveryDate,
      status: saleFormData.status,
      remarks: saleFormData.remarks,
    };

    const incrementalId = sales.length > 0 ? Math.max(...sales.map((s) => s.incrementalId)) + 1 : 1;
    if (editingSale) {
      setSales(sales.map((s) => (s.id === editingSale.id ? { ...s, ...saleData } : s)));
    } else {
      const newSale = {
        id: `sl-${String(incrementalId).padStart(3, "0")}`,
        incrementalId,
        ...saleData,
      };
      setSales([...sales, newSale]);
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
      setSales(sales.filter((s) => s.id !== deleteSaleTargetId));
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
      setPayments(payments.filter((p) => p.id !== deletePaymentTargetId));
      setShowPaymentDeleteConfirm(false);
      setDeletePaymentTargetId("");
    }
  };

  const handlePaymentDeleteCancel = () => {
    setShowPaymentDeleteConfirm(false);
    setDeletePaymentTargetId("");
  };

  // 支払いマスタ関連の関数
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
    } else {
      const newMaster = {
        id: `pmst-${String(incrementalId).padStart(3, "0")}`,
        incrementalId,
        ...masterData,
      };
      setPaymentMasters([...paymentMasters, newMaster]);
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
      setPaymentMasters(paymentMasters.filter((m) => m.id !== deletePaymentMasterTargetId));
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

  const filteredOrders = orders.filter((order) => {
    const supplier = suppliers.find((s) => s.id === order.supplierId);
    const supplierName = supplier ? supplier.name : "";
    const matchesSearch =
      order.product.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
      supplierName.toLowerCase().includes(orderSearchQuery.toLowerCase());
    const matchesFilter = orderFilterStatus === "all" || order.status === orderFilterStatus;
    return matchesSearch && matchesFilter;
  });

  const orderStats = {
    total: orders.length,
    ordered: orders.filter((o) => o.status === "ordered").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
  };

  // 売上のフィルタリングと統計
  const filteredSales = sales.filter((sale) => {
    const customer = suppliers.find((s) => s.id === sale.customerId);
    const customerName = customer ? customer.name : "";
    const matchesSearch =
      sale.product.toLowerCase().includes(saleSearchQuery.toLowerCase()) ||
      customerName.toLowerCase().includes(saleSearchQuery.toLowerCase());
    const matchesFilter = saleFilterStatus === "all" || sale.status === saleFilterStatus;
    return matchesSearch && matchesFilter;
  });

  const saleStats = {
    total: sales.length,
    pending: sales.filter((s) => s.status === "pending").length,
    shipped: sales.filter((s) => s.status === "shipped").length,
    delivered: sales.filter((s) => s.status === "delivered").length,
  };

  // 支払いのフィルタリングと統計
  // 選択年月の支払いをフィルタリング
  const filteredPayments = payments.filter((payment) => {
    const matchesYearMonth = payment.yearMonth === selectedYearMonth;
    const matchesSearch = payment.description.toLowerCase().includes(paymentSearchQuery.toLowerCase());
    const matchesFilter = paymentFilterCategory === "all" || payment.category === paymentFilterCategory;
    return matchesYearMonth && matchesSearch && matchesFilter;
  });

  // 選択年月の支払い統計
  const paymentStats = {
    total: payments.filter((p) => p.yearMonth === selectedYearMonth).length,
    paid: payments.filter((p) => p.yearMonth === selectedYearMonth && p.status === "paid").length,
    pending: payments.filter((p) => p.yearMonth === selectedYearMonth && p.status === "pending").length,
  };

  // 支払いマスタのフィルタリングと統計
  const filteredPaymentMasters = paymentMasters.filter((master) => {
    const matchesSearch = master.description.toLowerCase().includes(paymentMasterSearchQuery.toLowerCase());
    const matchesFilter = paymentMasterFilterCategory === "all" || master.category === paymentMasterFilterCategory;
    return matchesSearch && matchesFilter;
  });

  const paymentMasterStats = {
    total: paymentMasters.length,
    fixed: paymentMasters.filter((m) => m.isFixed).length,
    variable: paymentMasters.filter((m) => !m.isFixed).length,
  };

  const filteredSuppliers = suppliers.filter((supplier) => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === "all" || supplier.type === filterType;
    return matchesSearch && matchesFilter;
  });

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

      console.log(`発注ID ${order.id}: 日付=${order.orderDate}, 月=${orderMonth}, 年=${orderYear}, ステータス=${order.status}`);

      const isCurrentMonth = orderMonth === targetMonth && orderYear === targetYear;
      const isValidStatus = order.status === "ordered" || order.status === "delivered";

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

    // 今月の未納入件数（発注済みのみカウント）
    const pendingCount = currentMonthOrders.filter((order) => order.status === "ordered").length;

    return {
      total: usdEquivalent,
      orderCount: orderCount,
      pendingCount: pendingCount,
      usd: totalUSD,
      jpy: totalJPY,
      vnd: totalVND,
    };
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
          monthlyOrderCount: t.monthlyOrderCount,
          pendingDeliveries: t.pendingDeliveries,
        }}
        monthlyPurchase={calculateMonthlyPurchase()}
      />

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{t.quickActions}</h3>
        <QuickActions
          actions={quickActions}
          translations={{ createNew: t.createNew }}
          onActionClick={setCurrentPage}
        />
      </div>

      <Alerts alerts={alerts} title={t.alerts} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <TodayTasks tasks={tasks} title={t.todayTasks} approveText={t.approve} />
        </div>

        <div>
          <RecentActivity activities={recentActivities} title={t.recentActivity} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesByCustomer data={salesData} title={t.salesByCustomer} colors={COLORS} />
        <CashFlow data={cashFlowData} title={t.cashFlow} />
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-6">
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
        <div className="p-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
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
              <option value="cancelled">{t.cancelled}</option>
            </select>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-lg flex items-center gap-2">
              <Download size={18} />
              {t.export}
            </button>
            <button
              onClick={() => handleOpenOrderModal(null)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 font-medium"
            >
              <Plus size={20} />
              {t.addOrder}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t.orderDate}</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t.supplierName}</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t.product}</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">{t.quantity}</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">{t.unitPrice}</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">{t.amount}</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t.deliveryDate}</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t.status}</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">{t.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order) => {
                const supplier = suppliers.find((s) => s.id === order.supplierId);
                const totalAmount = order.quantity * order.unitPrice;
                return (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-700">{order.orderDate}</td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-800">{supplier?.name || "-"}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-800">{order.product}</p>
                      {order.remarks && <p className="text-sm text-gray-500">{order.remarks}</p>}
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
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          order.status === "ordered"
                            ? "bg-orange-50 text-orange-700"
                            : order.status === "delivered"
                            ? "bg-green-50 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {t[order.status]}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleOpenOrderModal(order)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title={t.edit}
                        >
                          <Edit size={18} />
                        </button>
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
      <div className="grid grid-cols-3 gap-6">
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
        <div className="p-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
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
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-lg flex items-center gap-2">
              <Download size={18} />
              {t.export}
            </button>
            <button className="px-4 py-2 text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-lg flex items-center gap-2">
              <Upload size={18} />
              {t.import}
            </button>
            <button
              onClick={() => handleOpenModal(null)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 font-medium"
            >
              <Plus size={20} />
              {t.addSupplier}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t.supplierName}</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t.type}</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t.region}</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t.currency}</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t.paymentTerms}</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t.status}</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">{t.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredSuppliers.map((supplier) => (
                <tr key={supplier.id} className="hover:bg-gray-50 transition-colors">
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
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleOpenModal(supplier)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title={t.edit}
                      >
                        <Edit size={18} />
                      </button>
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
      <div className="grid grid-cols-4 gap-6">
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
              <p className="text-sm text-gray-600 mb-1">{t.pendingSales}</p>
              <p className="text-3xl font-bold text-orange-600">{saleStats.pending}</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <Clock className="text-orange-500" size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{t.shippedSales}</p>
              <p className="text-3xl font-bold text-purple-600">{saleStats.shipped}</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <Package className="text-purple-500" size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{t.deliveredSales}</p>
              <p className="text-3xl font-bold text-green-600">{saleStats.delivered}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle className="text-green-500" size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
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
              <option value="pending">{t.pending}</option>
              <option value="shipped">{t.shipped}</option>
              <option value="delivered">{t.delivered}</option>
              <option value="cancelled">{t.cancelled}</option>
            </select>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-lg flex items-center gap-2">
              <Download size={18} />
              {t.export}
            </button>
            <button
              onClick={() => handleOpenSaleModal(null)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 font-medium"
            >
              <Plus size={20} />
              {t.addSale}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t.saleDate}</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t.customerName}</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t.product}</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">{t.quantity}</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">{t.unitPrice}</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">{t.amount}</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t.deliveryDate}</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t.status}</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">{t.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredSales.map((sale) => {
                const customer = suppliers.find((s) => s.id === sale.customerId);
                const totalAmount = sale.quantity * sale.unitPrice;
                return (
                  <tr key={sale.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-700">{sale.saleDate}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-800">{customer?.name || "-"}</div>
                      <div className="text-xs text-gray-500">{customer?.region ? t[customer.region as keyof typeof t] as string : "-"}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-800">{sale.product}</div>
                      {sale.remarks && <p className="text-sm text-gray-500">{sale.remarks}</p>}
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
                    <td className="px-6 py-4 text-sm text-gray-700">{sale.deliveryDate}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          sale.status === "pending"
                            ? "bg-orange-50 text-orange-700"
                            : sale.status === "shipped"
                            ? "bg-purple-50 text-purple-700"
                            : sale.status === "delivered"
                            ? "bg-green-50 text-green-700"
                            : "bg-gray-50 text-gray-700"
                        }`}
                      >
                        {sale.status === "pending"
                          ? t.pending
                          : sale.status === "shipped"
                          ? t.shipped
                          : sale.status === "delivered"
                          ? t.delivered
                          : t.cancelled}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleOpenSaleModal(sale)}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        >
                          <Edit size={16} />
                        </button>
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
      <div className="grid grid-cols-3 gap-6">
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
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
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
                className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 font-medium transition-colors"
              >
                <Plus size={20} />
                {t.generatePayments}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1">
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
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-y border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.category}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.description}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.amount}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.paymentMethod}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.paymentDate}</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">{t.status}</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">{t.actions}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPayments.map((payment) => {
                return (
                  <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
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
                      {payment.isFixed && (
                        <div className="text-xs text-blue-600 mt-1">{t.fixedCost}</div>
                      )}
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
                      {payment.paymentMethod === "bank"
                        ? t.bank
                        : payment.paymentMethod === "cash"
                        ? t.cash
                        : t.card}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.paymentDate || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          payment.status === "paid"
                            ? "bg-green-50 text-green-700"
                            : "bg-orange-50 text-orange-700"
                        }`}
                      >
                        {payment.status === "paid" ? t.paymentStatusPaid : t.paymentStatusPending}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleOpenPaymentModal(payment)}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        >
                          <Edit size={16} />
                        </button>
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
      <div className="grid grid-cols-3 gap-6">
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
        <div className="p-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
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
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 font-medium transition-colors"
          >
            <Plus size={20} />
            {t.addPaymentMaster}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-y border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.category}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.description}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.fixedAmount}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.paymentMethod}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.paymentDay}</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">{t.actions}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPaymentMasters.map((master) => {
                return (
                  <tr key={master.id} className="hover:bg-gray-50 transition-colors">
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {master.paymentDay}日
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleOpenPaymentMasterModal(master)}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        >
                          <Edit size={16} />
                        </button>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.jpyRate}
            </label>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.vndRate}
            </label>
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
      {/* サイドバー */}
      <aside className={`${sidebarOpen ? "w-64" : "w-20"} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}>
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          {sidebarOpen && (
            <div>
              <h1 className="font-bold text-lg text-gray-800">増田ビニール</h1>
              <p className="text-xs text-gray-500">経営管理システム</p>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(item.page)}
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
        <header className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {currentPage === "dashboard" && t.dashboard}
                {currentPage === "suppliers" && t.supplierMaster}
                {currentPage === "orders" && t.orderMaster}
                {currentPage === "sales" && t.saleMaster}
                {currentPage === "payments" && t.paymentManagement}
                {currentPage === "paymentMaster" && t.paymentMasterTitle}
                {currentPage === "reports" && t.reports}
                {currentPage === "systemSettings" && t.systemSettings}
              </h2>
              <p className="text-sm text-gray-500">
                {currentPage === "suppliers"
                  ? t.supplierList
                  : currentPage === "orders"
                  ? t.orderList
                  : currentPage === "sales"
                  ? t.saleList
                  : currentPage === "payments"
                  ? t.paymentList
                  : currentPage === "paymentMaster"
                  ? t.paymentMasterList
                  : "2024年11月20日 (水)"}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as "ja" | "vi")}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ja">日本語</option>
                <option value="vi">Tiếng Việt</option>
              </select>
              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
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
        <div className="p-8 max-w-7xl mx-auto">
          {currentPage === "dashboard" && renderDashboard()}
          {currentPage === "suppliers" && renderSuppliers()}
          {currentPage === "orders" && renderOrders()}
          {currentPage === "sales" && renderSales()}
          {currentPage === "payments" && renderPayments()}
          {currentPage === "paymentMaster" && renderPaymentMaster()}
          {currentPage === "reports" && (
            <div className="bg-white p-12 rounded-xl shadow text-center">
              <FileText size={48} className="mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600">レポート画面（準備中）</p>
            </div>
          )}
          {currentPage === "systemSettings" && renderSystemSettings()}
        </div>
      </main>

      {/* モーダル */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h3 className="text-xl font-bold text-gray-800">{editingSupplier ? t.editSupplier : t.addSupplier}</h3>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
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
                  {t.supplierName} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="例: Nguyen Trading Co., Ltd."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
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

              <div className="grid grid-cols-2 gap-4">
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

            <div className="p-6 border-t border-gray-200 flex items-center justify-end gap-3 bg-gray-50">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 text-gray-700 hover:bg-gray-100 border border-gray-300 rounded-lg font-medium transition-colors"
              >
                {t.cancel}
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 font-medium transition-colors"
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

            <div className="p-6 space-y-6">
              {orderValidationError && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                  <div className="flex items-center">
                    <AlertCircle className="text-red-500 mr-2" size={20} />
                    <p className="text-sm text-red-700 font-medium">{orderValidationError}</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
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
                  {t.supplierName} <span className="text-red-500">*</span>
                </label>
                <select
                  value={orderFormData.supplierId}
                  onChange={(e) => setOrderFormData({ ...orderFormData, supplierId: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">{lang === "ja" ? "選択してください" : "Chọn nhà cung cấp"}</option>
                  {suppliers
                    .filter((s) => s.status === "active")
                    .map((supplier) => (
                      <option key={supplier.id} value={supplier.id}>
                        {supplier.name}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.product} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={orderFormData.product}
                  onChange={(e) => setOrderFormData({ ...orderFormData, product: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="例: PVC材料 A-123"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
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
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.status}</label>
                <select
                  value={orderFormData.status}
                  onChange={(e) => setOrderFormData({ ...orderFormData, status: e.target.value as "ordered" | "delivered" | "cancelled" })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="ordered">{t.ordered}</option>
                  <option value="delivered">{t.delivered}</option>
                  <option value="cancelled">{t.cancelled}</option>
                </select>
              </div>

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
            </div>

            <div className="p-6 border-t border-gray-200 flex items-center justify-end gap-3 bg-gray-50">
              <button
                onClick={() => setShowOrderModal(false)}
                className="px-6 py-2 text-gray-700 hover:bg-gray-100 border border-gray-300 rounded-lg font-medium transition-colors"
              >
                {t.cancel}
              </button>
              <button
                onClick={handleOrderSave}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 font-medium transition-colors"
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

            <div className="p-6 space-y-6">
              {saleValidationError && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                  <div className="flex items-center">
                    <AlertCircle className="text-red-500 mr-2" size={20} />
                    <p className="text-sm text-red-700 font-medium">{saleValidationError}</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
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
                <input
                  type="text"
                  value={saleFormData.product}
                  onChange={(e) => setSaleFormData({ ...saleFormData, product: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="例: ビニール製品 VP-100"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.quantity} <span className="text-red-500">*</span>
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.status}</label>
                <select
                  value={saleFormData.status}
                  onChange={(e) => setSaleFormData({ ...saleFormData, status: e.target.value as "pending" | "shipped" | "delivered" | "cancelled" })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="pending">{t.pending}</option>
                  <option value="shipped">{t.shipped}</option>
                  <option value="delivered">{t.delivered}</option>
                  <option value="cancelled">{t.cancelled}</option>
                </select>
              </div>

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
            </div>

            <div className="p-6 border-t border-gray-200 flex items-center justify-end gap-3 bg-gray-50">
              <button
                onClick={() => setShowSaleModal(false)}
                className="px-6 py-2 text-gray-700 hover:bg-gray-100 border border-gray-300 rounded-lg font-medium transition-colors"
              >
                {t.cancel}
              </button>
              <button
                onClick={handleSaleSave}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 font-medium transition-colors"
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
              <h2 className="text-2xl font-bold text-gray-800">
                {editingPayment ? t.editPayment : t.addPayment}
              </h2>
            </div>

            <div className="p-6 space-y-6">
              {paymentValidationError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="text-red-600 shrink-0 mt-0.5" size={20} />
                  <p className="text-sm text-red-800">{paymentValidationError}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
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

              <div className="grid grid-cols-2 gap-4">
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

              <div className="grid grid-cols-2 gap-4">
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
              <h2 className="text-2xl font-bold text-gray-800">
                {editingPaymentMaster ? t.editPaymentMaster : t.addPaymentMaster}
              </h2>
            </div>

            <div className="p-6 space-y-6">
              {paymentMasterValidationError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="text-red-600 shrink-0 mt-0.5" size={20} />
                  <p className="text-sm text-red-800">{paymentMasterValidationError}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
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
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t.fixedAmount}</label>
                    <input
                      type="number"
                      value={paymentMasterFormData.fixedAmount}
                      onChange={(e) =>
                        setPaymentMasterFormData({ ...paymentMasterFormData, fixedAmount: Number(e.target.value) })
                      }
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

              <div className="grid grid-cols-2 gap-4">
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
                    onChange={(e) =>
                      setPaymentMasterFormData({ ...paymentMasterFormData, paymentDay: Number(e.target.value) })
                    }
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
              <h3 className="text-xl font-bold text-gray-800 text-center mb-2">
                {lang === "ja" ? "削除の確認" : "Xác nhận xóa"}
              </h3>
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
    </div>
  );
};

export default App;
