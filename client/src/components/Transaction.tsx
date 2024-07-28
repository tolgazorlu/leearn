/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useGetTransactions } from "@/api/auth";

const Transaction = () => {
    const { data: transactions } = useGetTransactions();

    return (
        <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader>
                <CardTitle>Transactions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
                {transactions?.map((item: any, index: number) => {
                    return (
                        <div className="flex items-center gap-4" key={index}>
                            <div className="grid gap-1">
                                <p className="text-sm font-medium leading-none">
                                    {item?.walletId.slice(0, 18)} ...
                                </p>
                            </div>
                            <div className="ml-auto font-medium">
                                {item?.destinationAddress.slice(0, 18)} ...
                            </div>
                            <div className="ml-auto font-medium">
                                {item?.operation}
                            </div>
                            <div className="ml-auto font-medium">
                                {item?.state}
                            </div>

                            <div className="ml-auto font-medium">
                                {item?.amounts[0]}
                            </div>
                        </div>
                    );
                })}
            </CardContent>
        </Card>
    );
};

export default Transaction;
