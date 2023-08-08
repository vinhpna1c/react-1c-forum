import { Link } from "react-router-dom";


type NavigationButtonProps = {
    children?: React.ReactNode,
    backgroundColor?: string,
    to?: string,
    selected?: boolean,
}

const SELECTED_BACKGROUND_COLOR = "#163B57";

function NavigationButton(props: NavigationButtonProps) {
    return (
        <Link to={props.to ?? '#'}>
            <div className="p-[10px] rounded-lg" style={{ backgroundColor: props.selected ? SELECTED_BACKGROUND_COLOR : props.backgroundColor }}>
                {props.children}
            </div>
        </Link>
    )

}

export default NavigationButton