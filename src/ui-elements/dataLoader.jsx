
export const ContentLoader = ({ loading, color, ...rest }) => {
    if (loading) {
        return (
            <div style={{ zIndex: 5 }} className='w-[100%] h-[100%] fixed flex justify-center items-center bg-[rgba(0,0,0,0.09)] left-0 top-0'>
                <div className='relative rounded-full bg-white w-[52px] h-[52px] p-[2px]'>
                    <div className="w-12 h-12 rounded-full animate-spin border-4 border-solid border-primary border-t-transparent"></div>
                </div>
            </div>
        )
    }
    else {
        return <></>
    }
}
