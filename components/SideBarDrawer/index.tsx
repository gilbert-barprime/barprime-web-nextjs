import { BellRing, X } from "lucide-react";
import { useEffect, useState } from "react";
import { customFetch } from "../../lib/helper";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { Notifications } from "../../types";
import Link from "next/link";
import { format, formatDistanceToNow, isSameWeek } from "date-fns";

export default function SidebarDrawer() {
  const { data: session, status } = useSession();
  const [notifications, setNotifications] = useState<Notifications[]>([]);
  const [is_drawer_open, setIsDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const getSmartDate = (date: Date) => {
    if (isSameWeek(date, new Date())) {
      return formatDistanceToNow(date, { addSuffix: true });
    }
    return format(date, "EEEE, MMM d");
  };

  const getNotifications = async () => {
    setLoading(true);
    const result = await customFetch({
      url: "/notifications",
      method: "GET",
      auth_token: session?.user.accessToken,
    });

    if (!result) {
      toast.error("Something went wrong!");
      setLoading(false);
      return;
    }

    const data = result.data;
    setNotifications(data);
    setLoading(false);
  };

  useEffect(() => {
    if (status === "authenticated") {
      getNotifications();
    }
  }, [status]);

  useEffect(() => {
    if (is_drawer_open && status === "authenticated") {
      getNotifications();
    }
  }, [status, is_drawer_open]);

  return (
    <div className="drawer drawer-end">
      <input
        id="my-drawer-5"
        type="checkbox"
        className="drawer-toggle"
        checked={is_drawer_open}
        onChange={(e) => setIsDrawerOpen(e.target.checked)}
      />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer-5" className="drawer-button btn btn-ghost ">
          <div className="relative">
            {notifications.filter((ele) => !ele.is_read).length > 0 && (
              <div className="inline-grid *:[grid-area:1/1] absolute -top-1 -right-1">
                <div className="status status-error animate-ping"></div>
                <div className="status status-error"></div>
              </div>
            )}
            <BellRing />
          </div>{" "}
          Notifications
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-5"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <ul className="menu bg-base-200 min-h-full w-80 xl:w-96 p-4 ">
          {/* Sidebar content here */}
          <li>
            <h2 className="menu-title text-lg flex items-center justify-between">
              Notifications{" "}
              <span
                className="text-black cursor-pointer rounded hover:bg-base-300"
                onClick={() => setIsDrawerOpen(false)}
              >
                <X />
              </span>
            </h2>
            {loading ? (
              <div className="flex justify-center">
                <span className="loading loading-ring loading-xl"></span>
              </div>
            ) : notifications.length > 0 ? (
              <ul>
                {notifications.map((ele) => (
                  <li key={ele._id}>
                    <Link
                      href={`/dashboard/study-planner?event=${ele.studyCalendarId}`}
                      onClick={async () => {
                        setIsDrawerOpen(false);
                        const result = await customFetch({
                          url: `/notifications/${ele._id}/read-status`,
                          method: "PUT",
                          data: JSON.stringify({ is_read: 1 }),
                          auth_token: session?.user.accessToken,
                        });

                        if (!result) {
                          toast.error("Something went wrong!");
                          return;
                        }
                      }}
                      className="card bg-base-100 card-xs shadow-sm hover:bg-base-300 p-1"
                    >
                      <div className="card-body w-full">
                        <h2 className="card-title flex justify-between">
                          <span className="flex gap-2 items-center">
                            {!ele.is_read && (
                              <div className="inline-grid *:[grid-area:1/1]">
                                <div className="status status-error animate-ping"></div>
                                <div className="status status-error"></div>
                              </div>
                            )}
                            {ele.title}
                          </span>
                          {!ele.is_read && (
                            <kbd className="kbd kbd-sm">Unread</kbd>
                          )}
                        </h2>
                        <p className="text-md">{ele.message}</p>
                        <div className="flex justify-end">
                          <span className="">
                            {/* {formatDistance(
                              new Date(ele.createdAt),
                              new Date(),
                              { addSuffix: true }
                            )} */}
                            {getSmartDate(new Date(ele.createdAt))}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div>No Don&apos;t have notification</div>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}
