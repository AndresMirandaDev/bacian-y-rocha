'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { Box, Container, Flex, Text } from '@radix-ui/themes';
import { usePathname } from 'next/navigation';
import { FaHelmetSafety } from 'react-icons/fa6';

import { MdDashboard } from 'react-icons/md';
import { FaFileInvoiceDollar } from 'react-icons/fa6';

import { FaChartBar } from 'react-icons/fa';
import { TbActivity } from 'react-icons/tb';

import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdClose } from 'react-icons/io';
import { FaBoxOpen } from 'react-icons/fa6';

import { useSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import Image from 'next/image';

import logo from '../../public/assets/images/byrs.png';

const SideBar = () => {
  const { status } = useSession();
  const [open, setOpen] = useState(false);
  const currentPath = usePathname();
  if (currentPath === '/' || currentPath === '/signin') return null;

  return (
    <nav>
      <div
        className={classNames({
          'bg-[rgb(243,244,246)]  mr-5 fixed h-full overflow-auto ease-in-out transition-all duration-300 w-56 z-40 justify-center shadow-slate-400 shadow-lg':
            true,
          'translate-x-0': open,
          '-translate-x-40': !open,
        })}
        // className={classNames({
        //   'lg:hidden': true, // Hide on large screens
        //   'bg-cyan-500 p-5 fixed top-0 left-0 w-full z-50': !open, // Bar styles for mobile
        //   'drawer lg:w-64 h-full overflow-auto ease-in-out transition-all duration-300':
        //     open, // Drawer styles for large screens
        // })}
      >
        <Container>
          <Flex direction="column">
            <Box className="p-4">
              {!open && (
                <GiHamburgerMenu
                  className="float-right mb-5 cursor-pointer text-2xl text-slate-400 "
                  onClick={() => {
                    setOpen(!open);
                  }}
                />
              )}
              {open && (
                <IoMdClose
                  className="float-right mb-5 cursor-pointer text-2xl text-slate-400 "
                  onClick={() => {
                    setOpen(!open);
                  }}
                />
              )}
            </Box>
            <Box
              className={classNames({
                'mb-5 justify-center flex': true,
                hidden: !open,
              })}
            >
              <Image src={logo} alt="logo" height={125} width={125} />
            </Box>
            <NavLinks open={open} />
          </Flex>
        </Container>
      </div>
    </nav>
  );
};

export default SideBar;

interface NavlinkProps {
  open: Boolean;
}

const NavLinks = ({ open }: NavlinkProps) => {
  const currentPath = usePathname();

  const links = [
    { label: 'Inicio', href: '/dashboard', icon: <MdDashboard /> },
    { label: 'O.trabajo', href: '/ot', icon: <FaHelmetSafety /> },
    { label: 'O.Compra', href: '/oc', icon: <FaFileInvoiceDollar /> },
  ];

  return (
    <ul>
      {links.map((link) => {
        return (
          <li key={link.href} className="flex items-center mb-4">
            <Link
              className={classNames({
                'text-zinc-400 pl-2': link.href !== currentPath,
                'bg-slate-300 transition-all p-2 border-r-4 border-[var(--accent-9)]':
                  link.href === currentPath && open,
                'hover:text-zinc-600 transition-colors text-zinc-600': true,
                'flex items-center w-full mt-2 font-medium': true,
                'justify-end text-2xl pr-5': !open,
                'text-[var(--accent-9)]': !open && link.href === currentPath,
              })}
              href={link.href}
            >
              <Box
                className={classNames({
                  'text-[var(--accent-9)]': link.href === currentPath,
                })}
              >
                {link.icon}
              </Box>
              <Box
                className={classNames({
                  'ml-2': true,
                  hidden: !open,
                })}
              >
                <Text>{link.label}</Text>
              </Box>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
