'use client';
import { Box, Container, Flex, Separator, Text } from '@radix-ui/themes';
import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FaFileInvoice, FaHelmetSafety } from 'react-icons/fa6';

import { FaFileInvoiceDollar } from 'react-icons/fa6';
import { MdAdminPanelSettings, MdDashboard } from 'react-icons/md';

import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdClose } from 'react-icons/io';

import { useSession } from 'next-auth/react';
import Image from 'next/image';

import logo from '../../public/assets/images/byrs.png';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { CiInboxIn, CiInboxOut } from 'react-icons/ci';

const SideBar = () => {
  const { status } = useSession();
  const [open, setOpen] = useState(true);
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
    {
      label: 'O.Compra',
      href: '/oc',
      icon: <FaFileInvoiceDollar />,
      subMenu: [
        {
          label: 'Emitidas',
          icon: <CiInboxOut />,
          href: '/oc/emitted',
        },
        {
          label: 'Recibidas',
          icon: <CiInboxIn />,
          href: '/oc/received',
        },
      ],
    },
    {
      label: 'Cotizaciones',
      href: '/quotes',
      icon: <FaFileInvoice />,
    },
    {
      label: 'Registro',
      href: '/register',
      icon: <MdAdminPanelSettings />,
    },
  ];

  const [openSubMenuIndex, setOpenSubMenuIndex] = useState<number | null>(null);

  const toggleSubMenu = (index: number) => {
    setOpenSubMenuIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <ul>
      {links.map((link, index) => {
        return (
          <li key={link.href} className="flex-col items-center mb-5">
            <Box
              className={classNames({
                'flex items-center ': true,
                'justify-end': !open,
                'bg-slate-300 transition-all p-3 border-r-4 border-[#EF6608]':
                  currentPath.startsWith(link.href) && open,
              })}
            >
              <Link
                className={classNames({
                  'text-zinc-500 pl-2': !currentPath.startsWith(link.href),
                  'hover:text-zinc-600 transition-colors ': true,
                  'flex items-center mt-2 font-medium': true,
                  'justify-end text-2xl pr-5': !open,
                  'text-[var(--accent-9)]':
                    !open && currentPath.startsWith(link.href),
                })}
                href={link.href}
              >
                <Box
                  className={classNames({
                    'text-[var(--accent-9)]': currentPath.startsWith(link.href),
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
              {link.subMenu && (
                <Box
                  onClick={() => toggleSubMenu(index)}
                  className={classNames({
                    hidden: !open,
                    'hover:scale-105 cursor-pointer p-1 transition-colors duration-300 hover:bg-slate-400 hover:text-white rounded-full ml-5':
                      true,
                  })}
                >
                  <ChevronDownIcon />
                </Box>
              )}
            </Box>

            {link.subMenu && (
              <ul
                className={classNames('ml-4 p-1 mt-2', {
                  'opacity-100': openSubMenuIndex === index,
                  'transition-transform duration-300 ease-in-out': true,
                  'opacity-0 hidden': openSubMenuIndex !== index,
                })}
              >
                {link.subMenu.map((subLink) => (
                  <li key={subLink.href} className="mb-3 mt-1">
                    <Link
                      className="flex items-center text-zinc-500 hover:text-zinc-600"
                      href={subLink.href}
                    >
                      <Box className="mr-2">{subLink.icon}</Box>
                      <Text>{subLink.label}</Text>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
};
