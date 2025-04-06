# LHDN Tax Calculator 🇲🇾

An unofficial modern web application to calculate Malaysian personal income tax based on the latest 2024 tax rates and reliefs.

## Features

- Accurate tax calculation based on 2024 LHDN tax brackets
- Support for different assessment types:
  - Single/Widower/Divorcee
  - Separate Assessment (Married)
  - Joint Assessment (Married)
- Comprehensive relief calculations
- Real-time tax computation
- Modern and user-friendly interface

## Tax Calculation Details

### Assessment Types and Non-Taxable Thresholds

The calculator supports three types of tax assessment with different non-taxable income thresholds:

1. **Single/Widower/Divorcee**: RM 37,333
2. **Separate Assessment (Married)**:
   - No children: RM 37,333
   - One child: RM 39,333
   - Two or more children: RM 41,333
3. **Joint Assessment**:
   - No children: RM 48,000
   - One child: RM 50,000
   - Two or more children: RM 52,000

### Tax Brackets (2024)

| Chargeable Income (RM) | Tax Rate (%) | Fixed Amount (RM) |
|------------------------|--------------|-------------------|
| 0 - 5,000             | 0           | 0                |
| 5,001 - 20,000        | 1           | 0                |
| 20,001 - 35,000       | 3           | 150              |
| 35,001 - 50,000       | 6           | 600              |
| 50,001 - 70,000       | 11          | 1,500            |
| 70,001 - 100,000      | 19          | 3,700            |
| 100,001 - 400,000     | 25          | 9,400            |
| 400,001 - 600,000     | 26          | 84,400           |
| 600,001 - 2,000,000   | 28          | 136,400          |
| Above 2,000,000       | 30          | 528,400          |

### Available Tax Reliefs

#### Automatic Reliefs
- Individual: RM 9,000
- Spouse: RM 4,000
- Disabled Individual: RM 6,000
- Disabled Spouse: RM 5,000

#### Parents Medical
- Total Medical Expenses: RM 8,000
- Medical Examination: RM 1,000 (sub-limit)

#### Medical & Support
- Basic Supporting Equipment: RM 6,000
- Medical Treatment: RM 10,000 (total)
  - Vaccination: RM 1,000 (sub-limit)
  - Dental: RM 1,000 (sub-limit)
- Medical Checkup: RM 1,000
- Mental Health Treatment: RM 1,000

#### Education
- Education Fees: RM 7,000 (total)
  - Upskilling/Self-enhancement: RM 2,000 (sub-limit)
- Child Education: RM 8,000

#### Lifestyle
- General Lifestyle: RM 2,500
- Sports-related: RM 1,000

#### Child Care
- Child Care Fees: RM 3,000
- Breastfeeding Equipment: RM 1,000
- Child Disability Support: RM 4,000

#### EPF & Insurance
- EPF:
  - Mandatory/Basic Voluntary: RM 4,000
  - Additional Voluntary: RM 3,000
- Life Insurance: RM 7,000
- Education Insurance: RM 3,000
- SOCSO: RM 350

#### Children
- Child Below 18: RM 2,000 per child
- Child Above 18 (Education): RM 2,000 per child
- Disabled Child: RM 6,000 per child
- Disabled Child (Studying): RM 8,000 per child

### Tax Rebates

For individuals with chargeable income not exceeding RM 35,000:
- Individual: RM 400
- Spouse (if eligible): RM 400

## Tech Stack

- React
- TypeScript
- Vite
- TailwindCSS

## Official References

For more detailed information about Malaysian income tax, please refer to these official sources:

1. [LHDN Official Website](https://www.hasil.gov.my/en/individual/introduction-individual-income-tax/)
2. [MyTax Portal](https://mytax.hasil.gov.my/)

## Development Setup

### Prerequisites

- Node.js (v20 or higher)
- npm (v10 or higher)

### Installation

1. Clone the repository
```bash
git clone https://github.com/hithereiamaliff/lhdncalculator.git
cd lhdncalculator
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be available in the `dist` directory.

## Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please make sure to:
- Update the documentation as needed
- Follow the existing code style
- Add comments for complex logic
- Test your changes thoroughly

## Disclaimer

This calculator is provided for reference and educational purposes only. While we strive to keep the calculations accurate and up-to-date with the latest Malaysian tax regulations, we make no guarantees about the accuracy of the results. Users should:

- Verify all calculations with official LHDN resources
- Consult with a qualified tax professional for specific tax advice
- Not rely solely on this calculator for tax filing purposes

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
