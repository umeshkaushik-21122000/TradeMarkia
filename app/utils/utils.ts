export function formatDate(timestampStr: string): string {
  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp)) {
    return "";
  }
  const date = new Date(timestamp * 1000);
  if (isNaN(date.getTime())) {
    return "";
  }
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  return date.toLocaleDateString("en-GB", options);
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "registered":
      return "text-green-600";
    case "pending":
      return "text-yellow-600";
    case "abandoned":
      return "text-red-600";
    case "other":
      return "text-blue-600";
    default:
      return "";
  }
}

export function getColorClass(color: string) {
  switch (color) {
    case "green":
      return "bg-green-600";
    case "yellow":
      return "bg-yellow-600";
    case "red":
      return "bg-red-600";
    case "blue":
      return "bg-blue-600";
    default:
      return "hidden";
  }
}
