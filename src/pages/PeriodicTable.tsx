import React, { useState } from 'react';
import { Share2, Info, FlaskConical, X } from 'lucide-react';

const elements = [
  { num: 1, sym: 'H', nameAr: 'هيدروجين', nameEn: 'Hydrogen', weight: '1.008', cat: 'nonmetal', disc: 'Cavendish', col: 1, row: 1 },
  { num: 2, sym: 'He', nameAr: 'هيليوم', nameEn: 'Helium', weight: '4.0026', cat: 'noble', disc: 'Janssen/Lockyer', col: 18, row: 1 },
  { num: 3, sym: 'Li', nameAr: 'ليثيوم', nameEn: 'Lithium', weight: '6.94', cat: 'alkali', disc: 'Arfwedson', col: 1, row: 2 },
  { num: 4, sym: 'Be', nameAr: 'بيريليوم', nameEn: 'Beryllium', weight: '9.0122', cat: 'alkaline-earth', disc: 'Vauquelin', col: 2, row: 2 },
  { num: 5, sym: 'B', nameAr: 'بورون', nameEn: 'Boron', weight: '10.81', cat: 'metalloid', disc: 'Gay-Lussac/Thénard', col: 13, row: 2 },
  { num: 6, sym: 'C', nameAr: 'كربون', nameEn: 'Carbon', weight: '12.011', cat: 'nonmetal', disc: 'Ancient', col: 14, row: 2 },
  { num: 7, sym: 'N', nameAr: 'نيتروجين', nameEn: 'Nitrogen', weight: '14.007', cat: 'nonmetal', disc: 'Rutherford', col: 15, row: 2 },
  { num: 8, sym: 'O', nameAr: 'أكسجين', nameEn: 'Oxygen', weight: '15.999', cat: 'nonmetal', disc: 'Priestley/Scheele', col: 16, row: 2 },
  { num: 9, sym: 'F', nameAr: 'فلور', nameEn: 'Fluorine', weight: '18.998', cat: 'halogen', disc: 'Moissan', col: 17, row: 2 },
  { num: 10, sym: 'Ne', nameAr: 'نيون', nameEn: 'Neon', weight: '20.180', cat: 'noble', disc: 'Ramsay/Travers', col: 18, row: 2 },
  { num: 11, sym: 'Na', nameAr: 'صوديوم', nameEn: 'Sodium', weight: '22.990', cat: 'alkali', disc: 'Davy', col: 1, row: 3 },
  { num: 12, sym: 'Mg', nameAr: 'مغنيسيوم', nameEn: 'Magnesium', weight: '24.305', cat: 'alkaline-earth', disc: 'Black', col: 2, row: 3 },
  { num: 13, sym: 'Al', nameAr: 'ألومنيوم', nameEn: 'Aluminum', weight: '26.982', cat: 'post-transition', disc: 'Oersted', col: 13, row: 3 },
  { num: 14, sym: 'Si', nameAr: 'سيليكون', nameEn: 'Silicon', weight: '28.085', cat: 'metalloid', disc: 'Berzelius', col: 14, row: 3 },
  { num: 15, sym: 'P', nameAr: 'فوسفور', nameEn: 'Phosphorus', weight: '30.974', cat: 'nonmetal', disc: 'Brand', col: 15, row: 3 },
  { num: 16, sym: 'S', nameAr: 'كبريت', nameEn: 'Sulfur', weight: '32.06', cat: 'nonmetal', disc: 'Ancient', col: 16, row: 3 },
  { num: 17, sym: 'Cl', nameAr: 'كلور', nameEn: 'Chlorine', weight: '35.45', cat: 'halogen', disc: 'Scheele', col: 17, row: 3 },
  { num: 18, sym: 'Ar', nameAr: 'أرغون', nameEn: 'Argon', weight: '39.948', cat: 'noble', disc: 'Rayleigh/Ramsay', col: 18, row: 3 },
  { num: 19, sym: 'K', nameAr: 'بوتاسيوم', nameEn: 'Potassium', weight: '39.098', cat: 'alkali', disc: 'Davy', col: 1, row: 4 },
  { num: 20, sym: 'Ca', nameAr: 'كالسيوم', nameEn: 'Calcium', weight: '40.078', cat: 'alkaline-earth', disc: 'Davy', col: 2, row: 4 },
  { num: 21, sym: 'Sc', nameAr: 'سكانديوم', nameEn: 'Scandium', weight: '44.956', cat: 'transition', disc: 'Nilson', col: 3, row: 4 },
  { num: 22, sym: 'Ti', nameAr: 'تيتانيوم', nameEn: 'Titanium', weight: '47.867', cat: 'transition', disc: 'Gregor', col: 4, row: 4 },
  { num: 23, sym: 'V', nameAr: 'فاناديوم', nameEn: 'Vanadium', weight: '50.942', cat: 'transition', disc: 'del Río', col: 5, row: 4 },
  { num: 24, sym: 'Cr', nameAr: 'كروم', nameEn: 'Chromium', weight: '51.996', cat: 'transition', disc: 'Vauquelin', col: 6, row: 4 },
  { num: 25, sym: 'Mn', nameAr: 'منغنيز', nameEn: 'Manganese', weight: '54.938', cat: 'transition', disc: 'Gahn', col: 7, row: 4 },
  { num: 26, sym: 'Fe', nameAr: 'حديد', nameEn: 'Iron', weight: '55.845', cat: 'transition', disc: 'Ancient', col: 8, row: 4 },
  { num: 27, sym: 'Co', nameAr: 'كوبالت', nameEn: 'Cobalt', weight: '58.933', cat: 'transition', disc: 'Brandt', col: 9, row: 4 },
  { num: 28, sym: 'Ni', nameAr: 'نيكل', nameEn: 'Nickel', weight: '58.693', cat: 'transition', disc: 'Cronstedt', col: 10, row: 4 },
  { num: 29, sym: 'Cu', nameAr: 'نحاس', nameEn: 'Copper', weight: '63.546', cat: 'transition', disc: 'Ancient', col: 11, row: 4 },
  { num: 30, sym: 'Zn', nameAr: 'زنك', nameEn: 'Zinc', weight: '65.38', cat: 'transition', disc: 'India', col: 12, row: 4 },
  { num: 31, sym: 'Ga', nameAr: 'غاليوم', nameEn: 'Gallium', weight: '69.723', cat: 'post-transition', disc: 'Lecoq de Boisbaudran', col: 13, row: 4 },
  { num: 32, sym: 'Ge', nameAr: 'جرمانيوم', nameEn: 'Germanium', weight: '72.630', cat: 'metalloid', disc: 'Winkler', col: 14, row: 4 },
  { num: 33, sym: 'As', nameAr: 'زرنيخ', nameEn: 'Arsenic', weight: '74.922', cat: 'metalloid', disc: 'Magnus', col: 15, row: 4 },
  { num: 34, sym: 'Se', nameAr: 'سيلينيوم', nameEn: 'Selenium', weight: '78.971', cat: 'nonmetal', disc: 'Berzelius', col: 16, row: 4 },
  { num: 35, sym: 'Br', nameAr: 'بروم', nameEn: 'Bromine', weight: '79.904', cat: 'halogen', disc: 'Balard/Löwig', col: 17, row: 4 },
  { num: 36, sym: 'Kr', nameAr: 'كريبتون', nameEn: 'Krypton', weight: '83.798', cat: 'noble', disc: 'Ramsay/Travers', col: 18, row: 4 },
  { num: 37, sym: 'Rb', nameAr: 'روبيديوم', nameEn: 'Rubidium', weight: '85.468', cat: 'alkali', disc: 'Bunsen/Kirchhoff', col: 1, row: 5 },
  { num: 38, sym: 'Sr', nameAr: 'سترونتيوم', nameEn: 'Strontium', weight: '87.62', cat: 'alkaline-earth', disc: 'Crawford', col: 2, row: 5 },
  { num: 39, sym: 'Y', nameAr: 'إتريوم', nameEn: 'Yttrium', weight: '88.906', cat: 'transition', disc: 'Gadolin', col: 3, row: 5 },
  { num: 40, sym: 'Zr', nameAr: 'زركونيوم', nameEn: 'Zirconium', weight: '91.224', cat: 'transition', disc: 'Klaproth', col: 4, row: 5 },
  { num: 41, sym: 'Nb', nameAr: 'نيوبيوم', nameEn: 'Niobium', weight: '92.906', cat: 'transition', disc: 'Hatchett', col: 5, row: 5 },
  { num: 42, sym: 'Mo', nameAr: 'موليبدينوم', nameEn: 'Molybdenum', weight: '95.95', cat: 'transition', disc: 'Scheele', col: 6, row: 5 },
  { num: 43, sym: 'Tc', nameAr: 'تكنيتيوم', nameEn: 'Technetium', weight: '98', cat: 'transition', disc: 'Perrier/Segrè', col: 7, row: 5 },
  { num: 44, sym: 'Ru', nameAr: 'روثينيوم', nameEn: 'Ruthenium', weight: '101.07', cat: 'transition', disc: 'Klaus', col: 8, row: 5 },
  { num: 45, sym: 'Rh', nameAr: 'روديوم', nameEn: 'Rhodium', weight: '102.91', cat: 'transition', disc: 'Wollaston', col: 9, row: 5 },
  { num: 46, sym: 'Pd', nameAr: 'بالاديوم', nameEn: 'Palladium', weight: '106.42', cat: 'transition', disc: 'Wollaston', col: 10, row: 5 },
  { num: 47, sym: 'Ag', nameAr: 'فضة', nameEn: 'Silver', weight: '107.87', cat: 'transition', disc: 'Ancient', col: 11, row: 5 },
  { num: 48, sym: 'Cd', nameAr: 'كادميوم', nameEn: 'Cadmium', weight: '112.41', cat: 'transition', disc: 'Stromeyer', col: 12, row: 5 },
  { num: 49, sym: 'In', nameAr: 'إنديوم', nameEn: 'Indium', weight: '114.82', cat: 'post-transition', disc: 'Reich/Richter', col: 13, row: 5 },
  { num: 50, sym: 'Sn', nameAr: 'قصدير', nameEn: 'Tin', weight: '118.71', cat: 'post-transition', disc: 'Ancient', col: 14, row: 5 },
  { num: 51, sym: 'Sb', nameAr: 'إثمد (أنتيمون)', nameEn: 'Antimony', weight: '121.76', cat: 'metalloid', disc: 'Ancient', col: 15, row: 5 },
  { num: 52, sym: 'Te', nameAr: 'تيلوريوم', nameEn: 'Tellurium', weight: '127.60', cat: 'metalloid', disc: 'von Reichenstein', col: 16, row: 5 },
  { num: 53, sym: 'I', nameAr: 'يود', nameEn: 'Iodine', weight: '126.90', cat: 'halogen', disc: 'Courtois', col: 17, row: 5 },
  { num: 54, sym: 'Xe', nameAr: 'زينون', nameEn: 'Xenon', weight: '131.29', cat: 'noble', disc: 'Ramsay/Travers', col: 18, row: 5 },
  { num: 55, sym: 'Cs', nameAr: 'سيزيوم', nameEn: 'Cesium', weight: '132.91', cat: 'alkali', disc: 'Bunsen/Kirchhoff', col: 1, row: 6 },
  { num: 56, sym: 'Ba', nameAr: 'باريوم', nameEn: 'Barium', weight: '137.33', cat: 'alkaline-earth', disc: 'Davy', col: 2, row: 6 },
  { num: 57, sym: 'La', nameAr: 'لانثانوم', nameEn: 'Lanthanum', weight: '138.91', cat: 'lanthanide', disc: 'Mosander', col: 3, row: 8 },
  { num: 58, sym: 'Ce', nameAr: 'سيريوم', nameEn: 'Cerium', weight: '140.12', cat: 'lanthanide', disc: 'Berzelius/Hisinger', col: 4, row: 8 },
  { num: 59, sym: 'Pr', nameAr: 'براسيوديميوم', nameEn: 'Praseodymium', weight: '140.91', cat: 'lanthanide', disc: 'von Welsbach', col: 5, row: 8 },
  { num: 60, sym: 'Nd', nameAr: 'نيوديميوم', nameEn: 'Neodymium', weight: '144.24', cat: 'lanthanide', disc: 'von Welsbach', col: 6, row: 8 },
  { num: 61, sym: 'Pm', nameAr: 'بروميثيوم', nameEn: 'Promethium', weight: '145', cat: 'lanthanide', disc: 'Marinsky/Glendenin', col: 7, row: 8 },
  { num: 62, sym: 'Sm', nameAr: 'ساماريوم', nameEn: 'Samarium', weight: '150.36', cat: 'lanthanide', disc: 'Lecoq de Boisbaudran', col: 8, row: 8 },
  { num: 63, sym: 'Eu', nameAr: 'يوروبيوم', nameEn: 'Europium', weight: '151.96', cat: 'lanthanide', disc: 'Demarçay', col: 9, row: 8 },
  { num: 64, sym: 'Gd', nameAr: 'غادولينيوم', nameEn: 'Gadolinium', weight: '157.25', cat: 'lanthanide', disc: 'de Marignac', col: 10, row: 8 },
  { num: 65, sym: 'Tb', nameAr: 'تيربيوم', nameEn: 'Terbium', weight: '158.93', cat: 'lanthanide', disc: 'Mosander', col: 11, row: 8 },
  { num: 66, sym: 'Dy', nameAr: 'ديسبروسيوم', nameEn: 'Dysprosium', weight: '162.50', cat: 'lanthanide', disc: 'Lecoq de Boisbaudran', col: 12, row: 8 },
  { num: 67, sym: 'Ho', nameAr: 'هولميوم', nameEn: 'Holmium', weight: '164.93', cat: 'lanthanide', disc: 'Soret', col: 13, row: 8 },
  { num: 68, sym: 'Er', nameAr: 'إربيوم', nameEn: 'Erbium', weight: '167.26', cat: 'lanthanide', disc: 'Mosander', col: 14, row: 8 },
  { num: 69, sym: 'Tm', nameAr: 'ثوليوم', nameEn: 'Thulium', weight: '168.93', cat: 'lanthanide', disc: 'Cleve', col: 15, row: 8 },
  { num: 70, sym: 'Yb', nameAr: 'إيتربيوم', nameEn: 'Ytterbium', weight: '173.05', cat: 'lanthanide', disc: 'Marignac', col: 16, row: 8 },
  { num: 71, sym: 'Lu', nameAr: 'لوتيشيوم', nameEn: 'Lutetium', weight: '174.97', cat: 'lanthanide', disc: 'Urbain', col: 17, row: 8 },
  { num: 72, sym: 'Hf', nameAr: 'هافنيوم', nameEn: 'Hafnium', weight: '178.49', cat: 'transition', disc: 'Coster/Hevesy', col: 4, row: 6 },
  { num: 73, sym: 'Ta', nameAr: 'تانتالوم', nameEn: 'Tantalum', weight: '180.95', cat: 'transition', disc: 'Ekeberg', col: 5, row: 6 },
  { num: 74, sym: 'W', nameAr: 'تنجستن', nameEn: 'Tungsten', weight: '183.84', cat: 'transition', disc: 'Elhuyar', col: 6, row: 6 },
  { num: 75, sym: 'Re', nameAr: 'رينيوم', nameEn: 'Rhenium', weight: '186.21', cat: 'transition', disc: 'Noddack/Tacke/Berg', col: 7, row: 6 },
  { num: 76, sym: 'Os', nameAr: 'أوزميوم', nameEn: 'Osmium', weight: '190.23', cat: 'transition', disc: 'Tennant', col: 8, row: 6 },
  { num: 77, sym: 'Ir', nameAr: 'إريديوم', nameEn: 'Iridium', weight: '192.22', cat: 'transition', disc: 'Tennant', col: 9, row: 6 },
  { num: 78, sym: 'Pt', nameAr: 'بلاتين', nameEn: 'Platinum', weight: '195.08', cat: 'transition', disc: 'Ulloa', col: 10, row: 6 },
  { num: 79, sym: 'Au', nameAr: 'ذهب', nameEn: 'Gold', weight: '196.97', cat: 'transition', disc: 'Ancient', col: 11, row: 6 },
  { num: 80, sym: 'Hg', nameAr: 'زئبق', nameEn: 'Mercury', weight: '200.59', cat: 'transition', disc: 'Ancient', col: 12, row: 6 },
  { num: 81, sym: 'Tl', nameAr: 'ثاليوم', nameEn: 'Thallium', weight: '204.38', cat: 'post-transition', disc: 'Crookes', col: 13, row: 6 },
  { num: 82, sym: 'Pb', nameAr: 'رصاص', nameEn: 'Lead', weight: '207.2', cat: 'post-transition', disc: 'Ancient', col: 14, row: 6 },
  { num: 83, sym: 'Bi', nameAr: 'بزموت', nameEn: 'Bismuth', weight: '208.98', cat: 'post-transition', disc: 'Geoffroy', col: 15, row: 6 },
  { num: 84, sym: 'Po', nameAr: 'بولونيوم', nameEn: 'Polonium', weight: '209', cat: 'metalloid', disc: 'Curie', col: 16, row: 6 },
  { num: 85, sym: 'At', nameAr: 'أستاتين', nameEn: 'Astatine', weight: '210', cat: 'halogen', disc: 'Corson/MacKenzie', col: 17, row: 6 },
  { num: 86, sym: 'Rn', nameAr: 'رادون', nameEn: 'Radon', weight: '222', cat: 'noble', disc: 'Dorn', col: 18, row: 6 },
  { num: 87, sym: 'Fr', nameAr: 'فرانسيوم', nameEn: 'Francium', weight: '223', cat: 'alkali', disc: 'Perey', col: 1, row: 7 },
  { num: 88, sym: 'Ra', nameAr: 'راديوم', nameEn: 'Radium', weight: '226', cat: 'alkaline-earth', disc: 'Curie', col: 2, row: 7 },
  { num: 89, sym: 'Ac', nameAr: 'أكتينيوم', nameEn: 'Actinium', weight: '227', cat: 'actinide', disc: 'Debierne', col: 3, row: 9 },
  { num: 90, sym: 'Th', nameAr: 'ثوريوم', nameEn: 'Thorium', weight: '232.04', cat: 'actinide', disc: 'Berzelius', col: 4, row: 9 },
  { num: 91, sym: 'Pa', nameAr: 'بروتكتينيوم', nameEn: 'Protactinium', weight: '231.04', cat: 'actinide', disc: 'Fajans/Göhring', col: 5, row: 9 },
  { num: 92, sym: 'U', nameAr: 'يورانيوم', nameEn: 'Uranium', weight: '238.03', cat: 'actinide', disc: 'Klaproth', col: 6, row: 9 },
  { num: 93, sym: 'Np', nameAr: 'نبتونيوم', nameEn: 'Neptunium', weight: '237', cat: 'actinide', disc: 'McMillan/Abelson', col: 7, row: 9 },
  { num: 94, sym: 'Pu', nameAr: 'بلوتونيوم', nameEn: 'Plutonium', weight: '244', cat: 'actinide', disc: 'Seaborg', col: 8, row: 9 },
  { num: 95, sym: 'Am', nameAr: 'أمريسيوم', nameEn: 'Americium', weight: '243', cat: 'actinide', disc: 'Seaborg', col: 9, row: 9 },
  { num: 96, sym: 'Cm', nameAr: 'كوريوم', nameEn: 'Curium', weight: '247', cat: 'actinide', disc: 'Seaborg', col: 10, row: 9 },
  { num: 97, sym: 'Bk', nameAr: 'بيركيليوم', nameEn: 'Berkelium', weight: '247', cat: 'actinide', disc: 'Seaborg', col: 11, row: 9 },
  { num: 98, sym: 'Cf', nameAr: 'كاليفورنيوم', nameEn: 'Californium', weight: '251', cat: 'actinide', disc: 'Seaborg', col: 12, row: 9 },
  { num: 99, sym: 'Es', nameAr: 'أينشتاينيوم', nameEn: 'Einsteinium', weight: '252', cat: 'actinide', disc: 'Ghiorso', col: 13, row: 9 },
  { num: 100, sym: 'Fm', nameAr: 'فيرميوم', nameEn: 'Fermium', weight: '257', cat: 'actinide', disc: 'Ghiorso', col: 14, row: 9 },
  { num: 101, sym: 'Md', nameAr: 'مندليفيوم', nameEn: 'Mendelevium', weight: '258', cat: 'actinide', disc: 'Ghiorso', col: 15, row: 9 },
  { num: 102, sym: 'No', nameAr: 'نوبليوم', nameEn: 'Nobelium', weight: '259', cat: 'actinide', disc: 'Ghiorso', col: 16, row: 9 },
  { num: 103, sym: 'Lr', nameAr: 'لورنسيوم', nameEn: 'Lawrencium', weight: '266', cat: 'actinide', disc: 'Ghiorso', col: 17, row: 9 },
  { num: 104, sym: 'Rf', nameAr: 'رذرفورديوم', nameEn: 'Rutherfordium', weight: '267', cat: 'transition', disc: 'Flerov', col: 4, row: 7 },
  { num: 105, sym: 'Db', nameAr: 'دوبنيوم', nameEn: 'Dubnium', weight: '270', cat: 'transition', disc: 'Flerov', col: 5, row: 7 },
  { num: 106, sym: 'Sg', nameAr: 'سيبورجيوم', nameEn: 'Seaborgium', weight: '271', cat: 'transition', disc: 'Flerov', col: 6, row: 7 },
  { num: 107, sym: 'Bh', nameAr: 'بوريوم', nameEn: 'Bohrium', weight: '270', cat: 'transition', disc: 'Armbruster/Münzenberg', col: 7, row: 7 },
  { num: 108, sym: 'Hs', nameAr: 'هاسيوم', nameEn: 'Hassium', weight: '277', cat: 'transition', disc: 'Armbruster/Münzenberg', col: 8, row: 7 },
  { num: 109, sym: 'Mt', nameAr: 'مايتنريوم', nameEn: 'Meitnerium', weight: '278', cat: 'transition', disc: 'Armbruster/Münzenberg', col: 9, row: 7 },
  { num: 110, sym: 'Ds', nameAr: 'دارمشتاتيوم', nameEn: 'Darmstadtium', weight: '281', cat: 'transition', disc: 'Hofmann', col: 10, row: 7 },
  { num: 111, sym: 'Rg', nameAr: 'رونتجينيوم', nameEn: 'Roentgenium', weight: '282', cat: 'transition', disc: 'Hofmann', col: 11, row: 7 },
  { num: 112, sym: 'Cn', nameAr: 'كوبرنيسيوم', nameEn: 'Copernicium', weight: '285', cat: 'transition', disc: 'Hofmann', col: 12, row: 7 },
  { num: 113, sym: 'Nh', nameAr: 'نيهونيوم', nameEn: 'Nihonium', weight: '286', cat: 'post-transition', disc: 'Morita', col: 13, row: 7 },
  { num: 114, sym: 'Fl', nameAr: 'فليروفيوم', nameEn: 'Flerovium', weight: '289', cat: 'post-transition', disc: 'Oganessian', col: 14, row: 7 },
  { num: 115, sym: 'Mc', nameAr: 'موسكوفيوم', nameEn: 'Moscovium', weight: '290', cat: 'post-transition', disc: 'Oganessian', col: 15, row: 7 },
  { num: 116, sym: 'Lv', nameAr: 'ليفرموريوم', nameEn: 'Livermorium', weight: '293', cat: 'post-transition', disc: 'Oganessian', col: 16, row: 7 },
  { num: 117, sym: 'Ts', nameAr: 'تينيسين', nameEn: 'Tennessine', weight: '294', cat: 'halogen', disc: 'Oganessian', col: 17, row: 7 },
  { num: 118, sym: 'Og', nameAr: 'أوغانيسون', nameEn: 'Oganesson', weight: '294', cat: 'noble', disc: 'Oganessian', col: 18, row: 7 }
];

const categoryColors: Record<string, string> = {
  'nonmetal': 'bg-green-500/20 border-green-500/40 text-green-300 hover:bg-green-500/40',
  'noble': 'bg-purple-500/20 border-purple-500/40 text-purple-300 hover:bg-purple-500/40',
  'alkali': 'bg-red-500/20 border-red-500/40 text-red-300 hover:bg-red-500/40',
  'alkaline-earth': 'bg-orange-500/20 border-orange-500/40 text-orange-300 hover:bg-orange-500/40',
  'metalloid': 'bg-teal-500/20 border-teal-500/40 text-teal-300 hover:bg-teal-500/40',
  'halogen': 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/40',
  'post-transition': 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/40',
  'transition': 'bg-blue-500/20 border-blue-500/40 text-blue-300 hover:bg-blue-500/40',
  'lanthanide': 'bg-pink-500/20 border-pink-500/40 text-pink-300 hover:bg-pink-500/40',
  'actinide': 'bg-fuchsia-500/20 border-fuchsia-500/40 text-fuchsia-300 hover:bg-fuchsia-500/40'
};

const translations = {
  ar: {
    title: "الجدول الدوري التفاعلي",
    subtitle: "تصفح جميع عناصر الجدول الدوري، اضغط على العنصر لعرض تفاصيله الكاملة (الوزن، الكثافة، والمكتشف).",
    atomicNum: "العدد الذري",
    symbol: "الرمز",
    name: "الاسم",
    weight: "الوزن الذري",
    disc: "المكتشف",
    cat: "التصنيف",
    cats: {
      'nonmetal': 'لافلزات',
      'noble': 'غازات نبيلة',
      'alkali': 'فلزات قلوية',
      'alkaline-earth': 'فلزات قلوية ترابية',
      'metalloid': 'أشباه فلزات',
      'halogen': 'هالوجينات',
      'post-transition': 'فلزات بعد انتقالية',
      'transition': 'فلزات انتقالية',
      'lanthanide': 'لانثانيدات',
      'actinide': 'أكتينيدات'
    },
    electronConfig: "التوزيع الإلكتروني",
    shareWhatsapp: "مشاركة الأداة",
    aboutTitle: "عن الأداة",
    aboutP1: "جدول دوري تفاعلي كامل يوفر مرجعاً كيميائياً سريعاً للطلاب والباحثين. يشتمل على معلومات مخزنة محلياً لسرعة العرض ويتميز بتصميم عصري وفرز لوني يسهل التمييز بين مجموعات العناصر.",
    adTop: "مساحة إعلانية",
    adTopDesc: "AD_SPACE_728x90 (أعلى)",
    adMiddle: "مساحة إعلانية",
    adMiddleDesc: "AD_SPACE_728x90 (وسط)"
  },
  en: {
    title: "Interactive Periodic Table",
    subtitle: "Browse all elements, click on any element to view its complete details (weight, discoverer, category).",
    atomicNum: "Atomic Number",
    symbol: "Symbol",
    name: "Name",
    weight: "Atomic Weight",
    disc: "Discoverer",
    cat: "Category",
    cats: {
      'nonmetal': 'Nonmetal',
      'noble': 'Noble Gas',
      'alkali': 'Alkali Metal',
      'alkaline-earth': 'Alkaline Earth Metal',
      'metalloid': 'Metalloid',
      'halogen': 'Halogen',
      'post-transition': 'Post-transition Metal',
      'transition': 'Transition Metal',
      'lanthanide': 'Lanthanide',
      'actinide': 'Actinide'
    },
    electronConfig: "Electron Configuration",
    shareWhatsapp: "Share Tool",
    aboutTitle: "About The Tool",
    aboutP1: "A fully interactive periodic table providing a quick chemistry reference for students and researchers. Features locally stored data for instant display and modern color-coding for element groups.",
    adTop: "AdSense Ad",
    adTopDesc: "AD_SPACE_728x90 (Top)",
    adMiddle: "AdSense Ad",
    adMiddleDesc: "AD_SPACE_728x90 (Middle)"
  }
};

const exceptionsConfig: Record<number, string[]> = {
  24: ['[Ar]', '3d⁵', '4s¹'],
  29: ['[Ar]', '3d¹⁰', '4s¹'],
  41: ['[Kr]', '4d⁴', '5s¹'],
  42: ['[Kr]', '4d⁵', '5s¹'],
  43: ['[Kr]', '4d⁵', '5s²'],
  44: ['[Kr]', '4d⁷', '5s¹'],
  45: ['[Kr]', '4d⁸', '5s¹'],
  46: ['[Kr]', '4d¹⁰'],
  47: ['[Kr]', '4d¹⁰', '5s¹'],
  57: ['[Xe]', '5d¹', '6s²'],
  58: ['[Xe]', '4f¹', '5d¹', '6s²'],
  64: ['[Xe]', '4f⁷', '5d¹', '6s²'],
  78: ['[Xe]', '4f¹⁴', '5d⁹', '6s¹'],
  79: ['[Xe]', '4f¹⁴', '5d¹⁰', '6s¹'],
  89: ['[Rn]', '6d¹', '7s²'],
  90: ['[Rn]', '6d²', '7s²'],
  91: ['[Rn]', '5f²', '6d¹', '7s²'],
  92: ['[Rn]', '5f³', '6d¹', '7s²'],
  93: ['[Rn]', '5f⁴', '6d¹', '7s²'],
  96: ['[Rn]', '5f⁷', '6d¹', '7s²'],
  103: ['[Rn]', '5f¹⁴', '7s²', '7p¹']
};

const orbitals = [
  { n: 1, l: 's', max: 2 },
  { n: 2, l: 's', max: 2 },
  { n: 2, l: 'p', max: 6 },
  { n: 3, l: 's', max: 2 },
  { n: 3, l: 'p', max: 6 },
  { n: 4, l: 's', max: 2 },
  { n: 3, l: 'd', max: 10 },
  { n: 4, l: 'p', max: 6 },
  { n: 5, l: 's', max: 2 },
  { n: 4, l: 'd', max: 10 },
  { n: 5, l: 'p', max: 6 },
  { n: 6, l: 's', max: 2 },
  { n: 4, l: 'f', max: 14 },
  { n: 5, l: 'd', max: 10 },
  { n: 6, l: 'p', max: 6 },
  { n: 7, l: 's', max: 2 },
  { n: 5, l: 'f', max: 14 },
  { n: 6, l: 'd', max: 10 },
  { n: 7, l: 'p', max: 6 }
];

const nobleGases = [
  { num: 2, sym: '[He]' },
  { num: 10, sym: '[Ne]' },
  { num: 18, sym: '[Ar]' },
  { num: 36, sym: '[Kr]' },
  { num: 54, sym: '[Xe]' },
  { num: 86, sym: '[Rn]' },
  { num: 118, sym: '[Og]' }
];

function superscripts(num: number): string {
  const map: Record<string, string> = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
  return String(num).split('').map(c => map[c]).join('');
}

function getElectronConfig(num: number): string {
  if (num === 1) return '1s¹';
  if (exceptionsConfig[num]) return exceptionsConfig[num].join(' ');

  let res: string[] = [];
  let lastNoble = null;
  for (let i = nobleGases.length - 1; i >= 0; i--) {
    if (num > nobleGases[i].num) {
      lastNoble = nobleGases[i];
      break;
    }
  }

  let tempE = num;
  let fullConfig: {n: number, l: string, e: number}[] = [];
  for (let orb of orbitals) {
    if (tempE <= 0) break;
    let add = Math.min(orb.max, tempE);
    fullConfig.push({ n: orb.n, l: orb.l, e: add });
    tempE -= add;
  }

  if (lastNoble) {
    res.push(lastNoble.sym);
    let lastNobleIndex = -1;
    let eCount = 0;
    for (let i = 0; i < fullConfig.length; i++) {
        eCount += fullConfig[i].e;
        if (eCount === lastNoble.num) {
            lastNobleIndex = i;
        }
    }
    
    let remaining = fullConfig.slice(lastNobleIndex + 1);
    remaining.sort((a, b) => {
        if (a.n !== b.n) return a.n - b.n;
        const lOrder: Record<string, number> = { 's': 0, 'p': 1, 'd': 2, 'f': 3 };
        return lOrder[a.l] - lOrder[b.l];
    });

    remaining.forEach(r => {
        res.push(`${r.n}${r.l}${superscripts(r.e)}`);
    });
  } else {
    // For elements <= 2 (just H and He, H handled above, He is 1s2)
    if (num === 2) return '1s²';
  }

  return res.join(' ');
}

export default function PeriodicTable({ lang }: { lang: 'ar' | 'en' }) {
  const t = translations[lang];
  const isAr = lang === 'ar';

  const [selectedElement, setSelectedElement] = useState<typeof elements[0] | null>(null);

  const generateShareText = () => {
    let str = isAr ? '*الجدول الدوري التفاعلي:*\n\n' : '*Interactive Periodic Table:*\n\n';
    str += isAr ? `اكتشف عناصر الكيمياء بأسلوب عصري وتفاعلي هنا: ` : `Explore chemistry elements interactively here: `;
    return encodeURIComponent(str + window.location.href);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1400px] mx-auto">
      {/* Top AdSense */}
      <div className="w-full h-20 bg-slate-800/30 rounded-lg flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 shadow-sm">
        <div className="text-[10px] uppercase tracking-widest mb-1">{t.adTop}</div>
        <p className="text-[10px]">{t.adTopDesc}</p>
      </div>

      <section className="p-4 md:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl flex flex-col gap-8 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="text-center relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg text-white">
            <FlaskConical size={32} />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-2">{t.title}</h2>
          <p className="text-sm text-slate-400 max-w-lg mx-auto">{t.subtitle}</p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 z-10">
            {Object.keys(t.cats).map(catKey => (
                <div key={catKey} className="flex items-center gap-1.5 md:gap-2">
                    <div className={`w-3 h-3 rounded-sm border ${categoryColors[catKey].replace('hover:', '')}`}></div>
                    <span className="text-[10px] md:text-xs text-slate-400 font-medium">{(t.cats as any)[catKey]}</span>
                </div>
            ))}
        </div>

        {/* Grid Area - Wrap it in an overflow-x-auto to handle small screens */}
        <div className="w-full overflow-x-auto custom-scrollbar pb-4 -mx-4 px-4 md:mx-0 md:px-0" dir="ltr">
            <div 
                className="grid gap-1 md:gap-1.5 min-w-[900px] lg:min-w-0" 
                style={{ 
                    gridTemplateColumns: 'repeat(18, minmax(0, 1fr))',
                    gridTemplateRows: 'repeat(9, minmax(0, 1fr))'
                }}
            >
                {elements.map((el) => (
                    <button
                        key={el.num}
                        onClick={() => setSelectedElement(el)}
                        style={{ gridColumn: el.col, gridRow: el.row }}
                        className={`
                            relative group flex flex-col items-center justify-center 
                            p-1 md:p-1.5 rounded-lg border shadow-sm transition-all
                            aspect-square ${categoryColors[el.cat]}
                            hover:scale-110 hover:z-10 focus:outline-none focus:ring-2 focus:ring-white/50
                        `}
                        title={isAr ? el.nameAr : el.nameEn}
                    >
                        <span className="absolute top-0.5 left-1 text-[8px] md:text-[10px] opacity-70 font-mono font-bold leading-none">{el.num}</span>
                        <span className="text-sm md:text-lg font-black leading-none mt-2">{el.sym}</span>
                        <span className="text-[7px] md:text-[9px] font-medium leading-tight truncate w-full text-center opacity-80 mt-1">
                            {isAr ? el.nameAr : el.nameEn}
                        </span>
                    </button>
                ))}
            </div>
        </div>

        <div className="hidden md:flex justify-center pt-2 relative z-10 w-full border-t border-white/5">
            <a
              href={`https://wa.me/?text=${generateShareText()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 mt-4 px-8 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-sm font-bold text-white shadow-lg transition-all border border-white/10"
            >
              <Share2 size={16} />
              {t.shareWhatsapp}
            </a>
        </div>
      </section>

      {/* Middle AdSense */}
      <div className="w-full h-20 bg-slate-800/30 rounded-lg flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 shadow-sm my-2">
        <div className="text-[10px] uppercase tracking-widest mb-1">{t.adMiddle}</div>
        <p className="text-[10px]">{t.adMiddleDesc}</p>
      </div>

      <article className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col gap-4 text-[13px] text-slate-300 leading-relaxed shadow-lg">
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-2">
            <Info size={20} className="text-cyan-400"/>
            <h2 className="text-lg font-bold text-cyan-400">{t.aboutTitle}</h2>
        </div>
        <div className="space-y-4">
          <p>{t.aboutP1}</p>
        </div>
      </article>

      {/* Modal */}
      {selectedElement && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
              <div 
                 className={`
                    relative w-full max-w-md p-6 rounded-3xl border border-white/20 shadow-2xl
                    ${categoryColors[selectedElement.cat].split(' ')[0]} 
                    bg-slate-900 overflow-hidden
                 `}
              >
                  <div className={`absolute top-0 right-0 w-48 h-48 rounded-full blur-[60px] pointer-events-none opacity-30 ${categoryColors[selectedElement.cat].split(' ')[0]} bg-white`}></div>
                  
                  <button 
                      onClick={() => setSelectedElement(null)}
                      className="absolute m-4 top-4 right-4 text-white/50 hover:text-white bg-slate-900/50 p-1.5 rounded-full backdrop-blur-md transition-colors z-20"
                  >
                      <X size={20} />
                  </button>

                  <div className="flex items-center justify-between mb-6 relative z-10" dir="ltr">
                      <div className="flex flex-col border-b border-white/10 pb-4 w-full">
                          <div className="flex items-baseline gap-3">
                              <span className="text-5xl font-black text-white">{selectedElement.sym}</span>
                              <span className="text-2xl font-bold text-white/80">{selectedElement.num}</span>
                          </div>
                      </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 text-sm relative z-10">
                      <div className="flex flex-col bg-slate-950/40 p-3 rounded-xl border border-white/5">
                          <span className="text-white/50 text-xs font-bold uppercase mb-1">{t.name}</span>
                          <span className="text-white font-bold text-lg">{isAr ? selectedElement.nameAr : selectedElement.nameEn}</span>
                      </div>
                      
                      <div className="flex flex-col bg-slate-950/40 p-3 rounded-xl border border-white/5">
                          <span className="text-white/50 text-xs font-bold uppercase mb-1">{t.cat}</span>
                          <span className="text-white font-medium">{(t.cats as any)[selectedElement.cat]}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                          <div className="flex flex-col bg-slate-950/40 p-3 rounded-xl border border-white/5" dir="ltr">
                              <span className="text-white/50 text-xs font-bold uppercase mb-1">{t.weight}</span>
                              <span className="text-white font-mono">{selectedElement.weight}</span>
                          </div>

                          <div className="flex flex-col bg-slate-950/40 p-3 rounded-xl border border-white/5">
                              <span className="text-white/50 text-xs font-bold uppercase mb-1">{t.disc}</span>
                              <span className="text-white font-medium leading-tight">{selectedElement.disc}</span>
                          </div>
                      </div>

                      <div className="flex flex-col bg-slate-950/40 p-3 rounded-xl border border-white/5" dir="ltr">
                          <span className="text-white/50 text-xs font-bold uppercase mb-1 tracking-wider text-center">{t.electronConfig}</span>
                          <span className="text-cyan-300 font-mono text-center font-bold">{getElectronConfig(selectedElement.num)}</span>
                      </div>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
}
