const Main = ({ children, boxLeft, boxRight }) => {
	return <main className="main">{children || [boxLeft, boxRight]}</main>;
};

export default Main;
