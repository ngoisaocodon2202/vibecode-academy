import { BarChart3 } from "lucide-react";
import { Card } from "@/components/ui/card";

export const metadata = { title: "Báo cáo — Admin" };

export default function AdminReportsPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-text-primary">Báo cáo</h1>
      <p className="mt-1 text-text-secondary">Báo cáo chi tiết sẽ được triển khai ở giai đoạn sau</p>

      <Card className="mt-6 flex flex-col items-center gap-2 py-16 text-center">
        <BarChart3 className="h-8 w-8 text-text-secondary" />
        <p className="text-sm font-medium text-text-primary">Chưa có báo cáo nào</p>
        <p className="text-sm text-text-secondary">
          Số liệu tổng quan hiện có tại trang Overview
        </p>
      </Card>
    </div>
  );
}
