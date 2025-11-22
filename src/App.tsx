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

  const translations = {
    ja: {
      dashboard: "ダッシュボード",
      suppliers: "取引先マスタ",
      orders: "発注登録",
      sales: "売上計上",
      payments: "支払管理",
      reports: "レポート",
      settings: "設定",
      logout: "ログアウト",
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
      pendingInvoices: "未払請求書",
      activeSuppliers: "アクティブ取引先",
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
      supplierName: "仕入先名",
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
      deleteConfirmTitle: "削除の確認",
      deleteConfirmMessage: "本当に削除しますか？この操作は取り消せません。",
    },
    vi: {
      dashboard: "Bảng điều khiển",
      suppliers: "Nhà cung cấp",
      orders: "Đặt hàng",
      sales: "Doanh thu",
      payments: "Thanh toán",
      reports: "Báo cáo",
      settings: "Cài đặt",
      logout: "Đăng xuất",
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
      pendingInvoices: "Hóa đơn chưa thanh toán",
      activeSuppliers: "Nhà cung cấp hoạt động",
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
      supplierName: "Tên nhà cung cấp",
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
      deleteConfirmTitle: "Xác nhận xóa",
      deleteConfirmMessage: "Bạn có chắc muốn xóa? Thao tác này không thể hoàn tác.",
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
    { icon: DollarSign, label: t.payments, page: "payments" },
    { icon: FileText, label: t.reports, page: "reports" },
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
    type: "material" | "processing" | "logistics" | "other";
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
    type: "material" | "processing" | "logistics" | "other";
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
    // 現在は2024年11月として計算（実際の日付に関わらず）
    const targetMonth = 10; // 10 = 11月（0始まり）
    const targetYear = 2024;

    console.log("=== 今月の仕入計算 ===");
    console.log("全発注データ:", orders);

    // 11月のデータでフィルター（発注済みまたは納品済み）
    const novemberOrders = orders.filter((order) => {
      if (!order.orderDate) {
        console.log("発注日なし:", order);
        return false;
      }

      const orderDate = new Date(order.orderDate);
      const orderMonth = orderDate.getMonth();
      const orderYear = orderDate.getFullYear();

      console.log(`発注ID ${order.id}: 日付=${order.orderDate}, 月=${orderMonth}, 年=${orderYear}, ステータス=${order.status}`);

      const isNovember2024 = orderMonth === targetMonth && orderYear === targetYear;
      const isValidStatus = order.status === "ordered" || order.status === "delivered";

      const result = isNovember2024 && isValidStatus;
      console.log(`  → 11月判定=${isNovember2024}, ステータス判定=${isValidStatus}, 結果=${result}`);

      return result;
    });

    console.log("11月の対象発注:", novemberOrders);

    // 通貨別に合計を計算
    let totalUSD = 0;
    let totalJPY = 0;
    let totalVND = 0;

    novemberOrders.forEach((order) => {
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

    // USDに換算（簡易的なレート）
    const usdEquivalent = totalUSD + totalJPY / 150 + totalVND / 25000;

    console.log(`合計: USD=${totalUSD}, JPY=${totalJPY}, VND=${totalVND}`);
    console.log(`USD換算: ${usdEquivalent}`);
    console.log("==================");

    return {
      total: usdEquivalent,
      byOrder: novemberOrders.length,
      usd: totalUSD,
      jpy: totalJPY,
      vnd: totalVND,
    };
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{t.welcome}, Huong! 👋</h3>
        <p className="text-gray-600">本日は3件のタスクがあります</p>
      </div>

      <DashboardSummary
        translations={{
          totalSales: t.totalSales,
          totalPurchase: t.totalPurchase,
          pendingInvoices: t.pendingInvoices,
          activeSuppliers: t.activeSuppliers,
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
                        : `${order.unitPrice.toLocaleString()}`}
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-bold text-gray-800">
                      {order.currency === "VND"
                        ? `${totalAmount.toLocaleString()} VND`
                        : order.currency === "JPY"
                        ? `¥${totalAmount.toLocaleString()}`
                        : `${totalAmount.toLocaleString()}`}
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
                {currentPage === "sales" && t.sales}
                {currentPage === "payments" && t.payments}
                {currentPage === "reports" && t.reports}
              </h2>
              <p className="text-sm text-gray-500">
                {currentPage === "suppliers" ? t.supplierList : currentPage === "orders" ? t.orderList : "2024年11月20日 (水)"}
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
          {currentPage === "sales" && (
            <div className="bg-white p-12 rounded-xl shadow text-center">
              <TrendingUp size={48} className="mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600">売上計上画面（準備中）</p>
            </div>
          )}
          {currentPage === "aaaaaaaaa" && (
            <div className="bg-white p-12 rounded-xl shadow text-center">
              <ShoppingCart size={48} className="mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600">発注登録画面（準備中）</p>
            </div>
          )}
          {currentPage === "sales" && (
            <div className="bg-white p-12 rounded-xl shadow text-center">
              <TrendingUp size={48} className="mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600">売上計上画面（準備中）</p>
            </div>
          )}
          {currentPage === "payments" && (
            <div className="bg-white p-12 rounded-xl shadow text-center">
              <DollarSign size={48} className="mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600">支払管理画面（準備中）</p>
            </div>
          )}
          {currentPage === "reports" && (
            <div className="bg-white p-12 rounded-xl shadow text-center">
              <FileText size={48} className="mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600">レポート画面（準備中）</p>
            </div>
          )}
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
                      setFormData({ ...formData, type: e.target.value as "material" | "processing" | "logistics" | "other" })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="material">{t.material}</option>
                    <option value="processing">{t.processing}</option>
                    <option value="logistics">{t.logistics}</option>
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
