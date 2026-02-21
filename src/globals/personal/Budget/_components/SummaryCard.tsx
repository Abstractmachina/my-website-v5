"use client";

import Loader from "@/components/animated/Loader";
import H2 from "@/components/styledComponents/H2";
import H3 from "@/components/styledComponents/H3";
import P from "@/components/styledComponents/P";
import { Separator } from "@/components/ui/separator";
import { Expense, Income } from "@/payload-types";
import { roundToDecimal } from "@/utilities/math/round";
import React, { useMemo } from "react";

type Props = {
	expenses?: Expense[] | null;
	income?: Income[] | null;
};

const SummaryCard = ({ expenses, income }: Props) => {
  const loading : boolean = (!expenses || !income);

	const totalIncome = useMemo<number>(() => {
		if (!income) return 0;
		return income.reduce((acc, curr) => acc + curr.amount, 0);
	}, [income]);

	const totalExpenses = useMemo<number>(() => {
		if (!expenses) return 0;
		return expenses.reduce((acc, curr) => acc + (curr.amount || 0), 0);
  }, [expenses]);
  
  const currentDate = new Date().getDate();
  const dailyExpenditure = totalExpenses / currentDate;
  const currentWeek = currentDate / 7;
  const weeklyExpenditure = totalExpenses / currentWeek;
  const projectedExpenditure = dailyExpenditure * 30;

	return (
    <section className="flex flex-col gap-8 w-full justify-between bg-zinc-700 rounded-lg p-8">
      {loading ? <div className="w-full flex justify-center items-center">
							<Loader />
						</div> :
			<>
        <div className="flex w-full justify-between">
          <div className="flex flex-col">
            <H2>Total Income</H2>
            <P>&euro;{roundToDecimal(totalIncome)}</P>
          </div>
          <div className="h-12">
                  <Separator
                    orientation="vertical"
                    className="bg-zinc-200 fill-zinc-100 h-20"
                  />
                </div>
          <div className="flex flex-col">
            <H2>Total Expenses</H2>
            <P>&euro;{roundToDecimal(totalExpenses)}</P>
                </div>
                <div className="h-12">
                  <Separator
                    orientation="vertical"
                    className="bg-zinc-200 fill-zinc-100 h-20"
                  />
                </div>
          {/* <div className="flex flex-col">
            <H2>Net Savings</H2>
            <P>&euro;{roundToDecimal(totalIncome - totalExpenses)}</P>
                  </div> */}
          <div className="flex flex-col">
            <H2>Cashflow</H2>
            <P>{roundToDecimal(totalIncome - totalExpenses)}</P>
          </div>
                  <div className="h-12">
                    <Separator
                      orientation="vertical"
                      className="bg-zinc-200 fill-zinc-100 h-20"
                    />
                  </div>
                  <div className="flex flex-col">
                    <H2>Savings Rate</H2>
                    <P> { roundToDecimal((totalIncome - totalExpenses) / totalIncome * 100) }%</P>
                  </div>
        </div>
        <div className="flex flex-col">
          <H3 className="text-sm italic">Projections</H3>
                <div className="flex gap-4 justify-between">
                  <div>
                    <H2>Daily Expenditure</H2>
                    <P>&euro;{roundToDecimal(dailyExpenditure)}</P>
                  </div>
                  <div className="h-12">
                    <Separator
                      orientation="vertical"
                      className="bg-zinc-200 fill-zinc-100 h-20"
                    />
                  </div>
                  <div>
                    <H2>Weekly Expenditure</H2>
                    <P>&euro;{roundToDecimal(weeklyExpenditure)}</P>
                  </div>
                  <div className="h-12">
                    <Separator
                      orientation="vertical"
                      className="bg-zinc-200 fill-zinc-100 h-20"
                    />
                  </div>
                  <div>
                    <H2>Estimated Monthly Expenditure</H2>
                    <P>&euro;{roundToDecimal(projectedExpenditure)}</P>
                  </div>
                </div>
        </div>
      </>
      }
		</section>
	);
};

export default SummaryCard;
