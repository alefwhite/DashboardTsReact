import React, { useState, useMemo } from "react";

import ContentHeader from "../../components/ContentHeader";
import MessageBox from "../../components/MessageBox";
import SelectInput from '../../components/SelectInput';
import WalletBox from '../../components/WalletBox';

import happyImg from '../../assets/happy.svg'
import sadImg from '../../assets/sad.svg'
import grinningImg from '../../assets/grinning.svg'

import expenses from '../../repositories/expenses';
import gains from '../../repositories/gains';

import listOfMonths from '../../utils/months';

import { Container, Content } from "./styles";

const Dashboard: React.FC = () => {
    const [monthSelected, setMothSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());

    const optionsName = [
        {value: 'Ana', label: 'Ana'},
        {value: 'Ana1', label: 'Ana1'},
        {value: 'Ana2', label: 'Ana2'}
    ];

    const years = useMemo(() => {
        let uniqueYears: number[] = [];

        [...expenses, ...gains].forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();

            if(!uniqueYears.includes(year)) {
                uniqueYears.push(year);
            }
        });

        return uniqueYears.map(year => {
            return {
                value: year,
                label: year
            }
        });

    }, []);

    const months = useMemo(() => {
        return listOfMonths.map((month, index) => {
            return {
                value: index + 1,
                label: month
            }
        });

    }, []);

    const totalExpenses = useMemo(() => {
        let total: number = 0;

        expenses.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth();

            if(month === monthSelected && year === yearSelected) {
                try {
                    total += Number(item.amount);
                } catch  {
                    throw new Error('Invalid amount! Amount must be number.');
                }
            }
        });

        return total;
    }, [monthSelected, yearSelected]);

    const totalGains = useMemo(() => {
        let total: number = 0;

        gains.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth();

            if(month === monthSelected && year === yearSelected) {
                try {
                    total += Number(item.amount);
                } catch  {
                    throw new Error('Invalid amount! Amount must be number.');
                }
            }
        });

        return total;

    }, [monthSelected, yearSelected]);

    const totalBalance = useMemo(() => {
        return totalGains - totalExpenses;
    },[totalGains, totalExpenses])

    const message = useMemo(() => {
           if(totalBalance < 0) {
               return {
                       title: 'Que triste!',
                       description: 'Neste mês, você gastou mais do que deveria!',
                       footerText: 'Verifique sesus gastos e tente cortar algumas coisas desnecessárias.',
                       icon: sadImg
               }
           } else if (totalBalance === 0) {
               return {
                   title: 'Ufa!',
                   description: 'Neste mês, você gastou exatamente o que ganhor!',
                   footerText: 'Tenha cuidado. No próximo mês tente poupar o seu dinheiro',
                   icon: grinningImg
               }
           } else {
               return {
                   title: 'Muito Bem!',
                   description: 'Sua carteira está positiva!',
                   footerText: 'Continue assim. Considere investir o seu saldo.',
                   icon: happyImg
               }
           }

    }, [totalBalance])
    const handleMonthSelected = (month: string) => {
        try {
            const parseMoth = Number(month)
            setMothSelected(parseMoth)
        } catch {
            throw new Error('Invalid month value. Is accept 0 - 24.')
        }
    }

    const handleYearSelected = (year: string) => {
        try {
            const parseYear = Number(year)
            setYearSelected(parseYear)
        } catch {
            throw new Error('Invalid year value. Is accept integer numbers')
        }
    }

    return (
        <Container>
            <ContentHeader title="Dashboard" lineColor="#F7931B">
                    <SelectInput
                            options={months}
                            onChange={(e) => handleMonthSelected(e.target.value)}
                            defaultValue={monthSelected}
                        />
                    <SelectInput
                        options={years}
                        onChange={(e) => handleYearSelected(e.target.value)}
                        defaultValue={yearSelected}
                    />
            </ContentHeader>
            <Content>
                <WalletBox
                    title="Saldo"
                    amount={totalBalance}
                    footerLabel="atualizado com base nas entradas e saídas"
                    icon="dolar"
                    color="#4E41F0"
                />
                <WalletBox
                    title="Entradas"
                    amount={totalGains}
                    footerLabel="atualizado com base nas entradas e saídas"
                    icon="arrowUp"
                    color="#F7931B"
                />
                <WalletBox
                    title="Saídas"
                    amount={totalExpenses}
                    footerLabel="atualizado com base nas entradas e saídas"
                    icon="arrowDown"
                    color="#E44C4E"
                />

                <MessageBox
                    title={message.title}
                    description={message.description}
                    footerText={message.footerText}
                    icon={message.icon}
                />

            </Content>
        </Container>
    );
}

export default Dashboard;
