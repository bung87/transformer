import React from "react";
interface Props {
    groups: Map<string, any[]>
    selected: string,
    onClick: Function
}

interface State {
    selected: string,
    active: Boolean
}
class Dropdown extends React.Component<Props, State> {
    state = {
        active: false,
        selected: this.props.selected
    }
    constructor(props) {
        super(props);

    }
    static defaultProps = {
        groups: new Map<string, any[]>(
            [
                ["scripts", [{
                    label: "coffeescript",
                    value: "coffee",
                    lang: "coffee",
                }, {
                    label: "es5",
                    value: "es5",
                    lang: "javascript",
                }, {
                    label: "es6",
                    value: "es6",
                    lang: "javascript",
                }
                    , {
                    label: "typescript",
                    value: "typescript",
                    lang: "typescript",
                }, {
                    label: "javascript",
                    value: "javascript",
                    lang: "javascript",
                }]],
                ["styles", [{
                    label: "scss",
                    value: "scss",
                    lang: "scss",
                },
                {
                    label: "css",
                    value: "css",
                    lang: "css",
                },
                {
                    label: "less",
                    value: "less",
                    lang: "less",
                },
                {
                    label: "sass",
                    value: "sass",
                    lang: "sass",
                }]]
            ]
        ),
        selected: "css"
    }
    render() {
        let dropdownClass = "dropdown"
        if (this.state.active) {
            dropdownClass += ' active';
        }
        const menu = []
        for (let [key, value] of this.props.groups.entries()) {
            menu.push(
                <React.Fragment key={key}>
                    <li key={key} className="divider" data-content={key}></li>
                    {value.filter(x => x.label !== this.state.selected).map(x => {
                        let className = 'menu-item';
                        if (this.state.selected === x.label) {
                            className += ' active';
                        }
                        return <li onClick={(e) => {
                            this.props.onClick(e, x);
                            this.setState({ selected: x.label });
                        }} key={x.label} className={className}><a href="#">{x.label}</a></li>
                    })}
                </React.Fragment>
            )
        }
        return (

            <div className={dropdownClass}>
                <a href="javascript:void(0);" onClick={
                    (e) => {
                        this.setState({ active: !this.state.active });
                        const l = () => {
                            this.setState({ active: !this.state.active })
                            document.removeEventListener("click", l);
                        };
                        document.addEventListener("click", l);
                    }
                }
                    className="btn btn-primary dropdown-toggle">
                    {this.state.selected} <i className="icon icon-caret"></i>
                </a>
                <ul className="menu">
                    {menu}
                </ul>
            </div>

        );
    }
}

export default Dropdown