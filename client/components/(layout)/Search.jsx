'use client';
import { useSearchDA } from '@/hooks/detail_aset/useSearchDA';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Avatar } from '@nextui-org/react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const Search = () => {
  const [search, setSearch] = useState('');
  const { data: asets } = useSearchDA(search);

  useEffect(() => {
    const savedSearch = localStorage.getItem('searchValue');
    if (savedSearch) {
      setSearch(savedSearch);
    }
  }, []);

  const onSearchChange = (e) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    localStorage.setItem('searchValue', newSearch);  // Menyimpan pencarian
  };

  const onRemove = () => {
    setSearch('');
    localStorage.setItem('searchValue', '');
  }


  return (
    <>
      <div className="dropdown">
        <label tabIndex={0} role="button" className="input input-sm outline-none border-none ring-0 flex items-center gap-2 bg-slate-100">
          <input type="text" className="grow" placeholder="Search" onChange={onSearchChange} value={search} />
          {search ? (<CloseOutlinedIcon onClick={onRemove} />) : (<SearchOutlinedIcon />)}
        </label>
        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-64 overflow-y-auto p-2 shadow mt-3">
          {asets?.map((aset) => {
            return (
              <Link href={`/detail_aset/${aset.id}`} onClick={onRemove} key={aset.id}>
                <li>
                  <div className="flex gap-2 items-center">
                    <Avatar alt={aset.aset.nama_barang} className="flex-shrink-0" size="sm" src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${aset?.Detail_Aset_Images[0]?.link}`} />
                    <div className="flex flex-col">
                      <span className="text-small">{aset.kode_barang}</span>
                      <span className="text-tiny text-default-400">{aset.aset.nama_barang}</span>
                    </div>
                  </div>
                </li>
              </Link>
            )
          })}

          {asets?.length === 0 && (
            <li className="text-center">Aset yang dicari tidak ditemukan</li>
          )}
        </ul>
      </div>
    </>
  );
};


export default Search;
