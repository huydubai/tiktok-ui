import Header from "~/components/Layout/components/Header";

function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <div>
                <div className="content">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;