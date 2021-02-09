import Head from 'next/head'

const Layout = ({ title, children }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div className="bg-gray-300">
                <main className="container mx-auto max-w-xl pt-8 min-h-screen">
                    {children}
                </main>
            </div>
        </>
    );
}

export default Layout;