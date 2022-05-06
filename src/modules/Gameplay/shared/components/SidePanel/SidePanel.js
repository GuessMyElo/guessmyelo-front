import './SidePanel.scss';

export default function SidePanel({children,position}) {
    return (
        <div className={'sidepanel-container '+position}>
            {children}
        </div>
    )
}