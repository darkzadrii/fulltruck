import { Button, Drawer, Menu, MenuProps } from "antd";
import { FC, useState } from "react";
import FullTruckLogo from "../logo/FullTruckLogo";
import useResizeHandler from '../../hook/useResizeHandler';
import { AppstoreOutlined, BarChartOutlined, ContainerOutlined, MenuOutlined, PieChartOutlined, StockOutlined } from "@ant-design/icons";

interface Props {
    onSelectionChange: (x: string) => void;
}

const Header: FC<Props> = ({ onSelectionChange }) => {
    const [selected, setSelected] = useState('');
    const [open, setOpen] = useState(false);
    const { isMobile } = useResizeHandler();

    type MenuItem = Required<MenuProps>['items'][number];

    const items: MenuItem[] = [
        { key: '1', icon: <AppstoreOutlined />, label: 'Dashboard' },
        { key: '2', icon: <ContainerOutlined />, label: 'Data Table' },
        { key: '3', icon: <PieChartOutlined />, label: 'KPI Grid' },
        { key: '4', icon: <BarChartOutlined />, label: 'Histograms' },
        { key: '5', icon: <StockOutlined />, label: 'Scalars' },
    ];

    const getLabelByKey = (key: string): string | undefined => {
        const item = items.find((item) => item?.key === key);
        if (item && 'label' in item) {
            return item.label?.toString();
        }

        return 'Dashboard';
    };


    const handleButtonClick = (value: string) => {
        setSelected(value);
        onSelectionChange(value);
    };

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const iconMap: { [key: string]: JSX.Element } = {
        'Dashboard': <AppstoreOutlined />,
        'Data Table': <ContainerOutlined />,
        'KPI Grid': <PieChartOutlined />,
        'Histograms': <BarChartOutlined />,
        'Scalars': <StockOutlined />,
    };

    return (
        <div className="header-container">
            {isMobile ? (
                <>
                    <Button onClick={showDrawer} icon={<MenuOutlined />} />
                    <FullTruckLogo />
                </>
            ) : (
                <>
                    <FullTruckLogo />
                    <div className="header-container-selection">
                        {["Dashboard", "Data Table", "KPI Grid", "Histograms", "Scalars"].map((text) => (
                            <Button
                                icon={iconMap[text]}
                                key={text}
                                type="text"
                                className={selected === text ? "selected-button" : ""}
                                onClick={() => handleButtonClick(text)}
                            >
                                {text}
                            </Button>
                        ))}
                    </div>
                </>
            )}
            <Drawer
                width={'80vw'}
                open={open}
                onClose={onClose}
                placement='left'
                closable={true}
            >
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    onSelect={(value) => {
                        const label = getLabelByKey(value.key);
                        if (label) {
                            onSelectionChange(label);
                            onClose();
                        }
                    }}
                    items={items}
                />
            </Drawer>
        </div>
    );
};

export default Header;
