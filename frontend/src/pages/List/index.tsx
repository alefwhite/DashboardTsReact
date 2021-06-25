import React, { useMemo, useState, useEffect } from "react";
import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import { Container, Content, Filters } from './styles'

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';
import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';
import listOfMonths from '../../utils/months';

import HistoryFinanceCard from '../../components/HistoryFinanceCard';

interface IRouteParams {
    match: {
        params: {
            type: string;
        }
    }
}

interface IData {
    description: string;
    amountFormatted: string;
    frequency: string;
    dateFormatted: string;
    tagColor: string;
}

const List: React.FC<IRouteParams> = ({ match }) => {
    const [data, setData] = useState<IData[]>([]);
    const [monthSelected, setMothSelected] = useState<string>(String(new Date().getMonth() + 1));
    const [yearSelected, setYearSelected] = useState<string>(String(new Date().getFullYear()));
    const [selectedFrequency, setSelectedFrequency] = useState(['recorrente', 'eventual']);


    const { type } = match.params;
    
    const title = useMemo(() => {
        return type === 'entry-balance' ? 
            {
                title: 'Entradas',
                lineColor: '#F7931B'
            } : 
            { 
                title: "Saídas",
                lineColor: '#E44C4E'
            }

    },[type]);

    const listData = useMemo(() => {
        return type === 'entry-balance' ? gains : expenses;
    }, [type]);

    // const months = [
    //     {value: 1, label:  'Janeiro'},
    //     {value: 2, label:  'Fevereiro'},
    //     {value: 3, label:  'Março'},
    //     {value: 4, label:  'Abril'},
    //     {value: 5, label:  'Maio'},
    //     {value: 6, label:  'Junho'},
    //     {value: 7, label:  'Julho'},
    //     {value: 8, label:  'Agosto'},
    //     {value: 9, label:  'Setembro'},
    //     {value: 10, label: 'Outubro'},
    //     {value: 11, label: 'Novembro'},
    //     {value: 12, label: 'Dezembro'}
       
    // ];

    // const years = [
    //     {value: 2019, label: 2019},
    //     {value: 2018, label: 2018},
    //     {value: 2020, label: 2020},
    //     {value: 2021, label: 2021},
    // ];

    const years = useMemo(() => {
        let uniqueYears: number[] = [];

        listData.forEach(item => {
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

    }, [listData]);

    const months = useMemo(() => {
        return listOfMonths.map((month, index) => {
            return {
                value: index + 1,
                label: month
            } 
        });

    }, []);
    
    const handleFrequencyClick = (frequency: string) => {
        const alreadySelected = selectedFrequency.findIndex(item => item === frequency);

        if(alreadySelected >= 0) {
            const filtered = selectedFrequency.filter(item => item !== frequency);
            setSelectedFrequency(filtered);

        } else {
            setSelectedFrequency((prev) => [...prev, frequency]);
        }
    };

    useEffect(() => {

        const filterDate = listData.filter(item => {
            const date = new Date(item.date);
            const month = String(date.getMonth() + 1);
            const year = String(date.getFullYear());

            return month === monthSelected && year === yearSelected
        });
        
        const formattedDate = filterDate.map(item => {
            return {
                description: item.description,
                amountFormatted: formatCurrency(Number(item.amount)),
                frequency: item.frequency,
                dateFormatted: formatDate(item.date),
                tagColor: item.frequency === 'recorrente' ? '#4E41F0' : '#E44C4E'
            }
        });

        setData(formattedDate);
      
    }, [listData, monthSelected, yearSelected]);

    return (
       <Container>
            <ContentHeader title={title.title} lineColor={title.lineColor}>
                <SelectInput options={months} onChange={(e) => setMothSelected(e.target.value)} defaultValue={monthSelected}/>
                <SelectInput options={years} onChange={(e) => setYearSelected(e.target.value)} defaultValue={yearSelected}/>
            </ContentHeader>

            <Filters>
                <button 
                    type="button"
                    className={`tag-filter tag-filter-recurrent 
                        ${selectedFrequency.includes('recorrente') && 'tag-actived'} 
                    `}
                    onClick={() => handleFrequencyClick('recorrente')}
                >
                    Recorrentes
                </button>
                <button 
                    type="button"
                    className={`tag-filter tag-filter-eventual
                         ${selectedFrequency.includes('eventual') && 'tag-actived'} 

                    `}
                    onClick={() => handleFrequencyClick('eventual')}

                >
                    Eventuais
                </button>
            </Filters>

            <Content>
                {
                    data.map((item, index) => (
                        <HistoryFinanceCard 
                            key={index}
                            tagColor={item.tagColor}
                            title={item.description}
                            subTitle={item.dateFormatted}
                            amount={item.amountFormatted}
        
                        />   
                    ))
                }
            </Content>
       </Container>
    );
}

export default List;