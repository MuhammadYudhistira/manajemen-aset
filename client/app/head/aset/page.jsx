import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import StatsAset from "@/components/(aset)/StatsAset";
import Link from "next/link";
import HeadGridAset from "./HeadGridAset";

const page = () => {
    return (
        <>
            <StatsAset />
            <HeadGridAset />
        </>
    );
};

export default page;
