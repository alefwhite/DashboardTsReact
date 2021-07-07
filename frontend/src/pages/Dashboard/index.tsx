import React, { useState, useMemo } from "react";

import ContentHeader from "../../components/ContentHeader";
import { Container } from "./styles";

import SelectInput from '../../components/SelectInput';

import expenses from '../../repositories/expenses';
import gains from '../../repositories/gains';

import listOfMonths from '../../utils/months';

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

    const handleMonthSelected = (month: string) => {
        try {
            const parseMoth = Number(month)
            setMothSelected(parseMoth)
        } catch (error) {
            throw new Error('Invalid month value. Is accept 0 - 24.')
        }
    }

    const handleYearSelected = (year: string) => {
        try {
            const parseYear = Number(year)
            setYearSelected(parseYear)            
        } catch (error) {
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
        </Container>
    );
}

export default Dashboard;