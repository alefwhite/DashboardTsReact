import React from "react";

import ContentHeader from "../../components/ContentHeader";
import { Container } from "./styles";

import SelectInput from '../../components/SelectInput';

const Dashboard: React.FC = () => {
    const optionsName = [
        {value: 'Ana', label: 'Ana'},
        {value: 'Ana1', label: 'Ana1'},
        {value: 'Ana2', label: 'Ana2'}
    ];

    return (
        <Container>
            <ContentHeader title="Dashboard" lineColor="#F7931B">
                <SelectInput options={optionsName} onChange={() => {}}/>
            </ContentHeader>            
        </Container>
    );
}

export default Dashboard;