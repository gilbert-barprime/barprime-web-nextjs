"use client";

import { useSession } from "next-auth/react";
import UpdateStatusBtn from "../../../../../components/Users/UpdateStatusBtn";
import { customFetch } from "../../../../../lib/helper";
import { UserList } from "../../../../../types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Select from "react-select";
import ReactPaginate from "react-paginate";
import { ArrowBigLeftDash, ArrowBigRightDash } from "lucide-react";
import { redirect } from "next/navigation";

const Options = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "pending", label: "Pending" },
  { value: "ended", label: "Ended" },
];
const itemsPerPage = 12;

export default function Page() {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState<UserList[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({ value: "all", label: "All" });
  const [itemOffset, setItemOffset] = useState(0);
  const [total_user, setTotalUser] = useState(0);
  const pageCount = Math.ceil(total_user / itemsPerPage);

  const handlePageClick = async (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % total_user;
    await getUserList({
      status: filter.value,
      offset: newOffset,
    });
    setItemOffset(newOffset);
  };

  const getUserList = async ({
    status,
    offset,
  }: {
    status: string;
    offset: number;
  }) => {
    setLoading(true);
    let url = `/admin/users/list?limit=${itemsPerPage}`;
    if (status) {
      url += `&subscription_status=${status}`;
    }
    if (offset) {
      url += `&offset=${offset}`;
    }
    const result = await customFetch({
      url: url,
      method: "GET",
      auth_token: session?.user.accessToken,
    });

    if (!result) {
      toast.error("Something went wrong while fetching users.");
      return;
    }

    const data: UserList[] = result.data;

    setUsers(data);
    setLoading(false);
    setTotalUser(result.record_count);
  };

  useEffect(() => {
    if (status === "authenticated") {
      getUserList({ status: filter.value, offset: itemOffset });
    }
  }, [status]);

  return (
    <div className="p-4 sm:p-6 max-w-full mx-auto">
      <div className="mb-8 flex justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Users
        </h1>
        <Select
          options={Options}
          value={filter}
          onChange={(newVal) => {
            if (newVal) {
              setFilter(newVal);
              getUserList({ status: newVal.value, offset: itemOffset });
            }
          }}
          placeholder="Filter by Status"
          className="min-w-52"
        />
      </div>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mb-4">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Account Activation Date</th>
              <th>Plan</th>
              <th>Amount</th>
              <th>Transaction ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={9} className="text-center text-lg">
                  loading...
                </td>
              </tr>
            ) : users.length <= 0 ? (
              <tr>
                <td colSpan={9} className="text-center text-lg">
                  No Data Found!
                </td>
              </tr>
            ) : (
              users &&
              users.map((user, index: number) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{user.full_name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.subscription ? (
                      <span className="badge">{user.subscription.status}</span>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>
                    {new Date(user.account_activation_date).toLocaleString()}
                  </td>
                  <td>
                    {user.subscription ? user.subscription.plan_name : "-"}
                  </td>
                  <td>
                    {user.subscription
                      ? `₱${user?.subscription?.total?.toLocaleString()}`
                      : "-"}
                  </td>
                  <td>
                    {user.subscription
                      ? user.subscription?.transaction_id
                      : "-"}
                  </td>
                  <td>
                    {user.subscription
                      ? (user.subscription?.status !== "active" ||
                          user.subscription?.has_pending_adjustment) && (
                          <UpdateStatusBtn
                            id={user._id}
                            getUserList={() =>
                              getUserList({
                                status: filter.value,
                                offset: itemOffset,
                              })
                            }
                          />
                        )
                      : "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{itemOffset + 1}</span> to{" "}
            <span className="font-medium">{itemOffset + users.length}</span> of{" "}
            <span className="font-medium">{total_user}</span> results
          </p>
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel={<ArrowBigRightDash className="cursor-pointer" />}
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel={<ArrowBigLeftDash className="cursor-pointer" />}
          renderOnZeroPageCount={null}
          activeClassName={"bg-blue-500 text-white"}
          previousClassName={
            "relative inline-flex items-center rounded-l-md px-2 py-2 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          }
          nextClassName={
            "relative inline-flex items-center rounded-r-md px-2 py-2 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          }
          containerClassName={
            "isolate inline-flex -space-x-px rounded-md shadow-sm"
          }
          pageClassName={
            "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          }
        />
      </div>
    </div>
  );
}
