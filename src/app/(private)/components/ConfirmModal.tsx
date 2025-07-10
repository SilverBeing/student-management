import Button from "./Button";interface ConfirmModalProps {
  open: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function ConfirmModal({
  open,
  message,
  onConfirm,
  onCancel,
  loading = false,
}: ConfirmModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs">
        <div className="mb-4 text-center text-base font-medium">{message}</div>
        <div className="flex justify-end gap-2">
          <Button
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800"
            onClick={onCancel}
            disabled={loading}
            type="button"
          >
            Cancel
          </Button>
          <Button
            className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white font-semibold"
            onClick={onConfirm}
            loading={loading}
            disabled={loading}
            type="button"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
