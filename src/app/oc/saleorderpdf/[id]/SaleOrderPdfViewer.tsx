'use client';
import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  Image,
  ImageProps,
} from '@react-pdf/renderer';
import logo from '../../../../../public/assets/images/byrs.png';
import qualitySeal from '../../../../../public/assets/images/sellocalidad.jpg';
import { SaleOrder } from '@prisma/client';

interface Props {
  saleOrder: SaleOrder;
}

const SaleOrderPDF = ({ saleOrder }: Props) => {
  const year = new Date(saleOrder.date).getFullYear();
  const date = new Date(saleOrder.date).getDate();
  const month = new Date(saleOrder.date).toLocaleString('default', {
    month: 'long',
  });
  const day = new Date(saleOrder.date).toLocaleDateString('default', {
    weekday: 'long',
  });

  // Calculate orderTotal
  const orderTotal = saleOrder.materials.reduce((accumulator, m) => {
    return m.quantity * m.unitPrice + accumulator;
  }, 0);

  console.log(logo);
  return (
    <Document>
      <Page style={{ padding: 5 }}>
        {/* Cabecera de documento */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginBottom: 5,
          }}
        >
          <View>
            <Image src={logo.src} style={{ height: 100, width: 200 }} />
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View style={{ flexDirection: 'row', gap: 4 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                Orden de Compra
              </Text>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                Nr {saleOrder.number}
              </Text>
            </View>
            <Text>{`${day} ${date} de ${month} ${year}`}</Text>
          </View>
        </View>
        {/* Cabecera de documento */}

        {/* Informacion del proveedor */}
        <View
          style={{
            flexDirection: 'row',
            border: '1 solid black',
            padding: 2,
            marginBottom: 10,
          }}
        >
          <View style={{ flexDirection: 'column', flexGrow: 1 }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: '25%' }}>
                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>SEÑOR</Text>
              </View>
              <View style={{ width: '25%', justifyContent: 'flex-start' }}>
                <Text style={{ textTransform: 'capitalize', fontSize: 12 }}>
                  {saleOrder.providerName}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: '25%' }}>
                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
                  DIRECCIÓN
                </Text>
              </View>
              <View style={{ width: '25%', justifyContent: 'flex-start' }}>
                <Text style={{ textTransform: 'capitalize', fontSize: 12 }}>
                  {saleOrder.providerAddress}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: '25%' }}>
                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>GIRO</Text>
              </View>
              <View style={{ width: '25%', justifyContent: 'flex-start' }}>
                <Text style={{ textTransform: 'capitalize', fontSize: 12 }}>
                  {saleOrder.providerLine}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: '25%' }}>
                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>EMAIL</Text>
              </View>
              <View style={{ width: '25%', justifyContent: 'flex-start' }}>
                <Text style={{ textTransform: 'capitalize', fontSize: 12 }}>
                  {saleOrder.providerEmail}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'column', flexGrow: 1 }}>
            <View style={{ flexDirection: 'row', gap: 4 }}>
              <View style={{ width: '25%' }}>
                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>RUT</Text>
              </View>
              <View style={{ flexGrow: 1, justifyContent: 'flex-start' }}>
                <Text style={{ textTransform: 'capitalize', fontSize: 12 }}>
                  {saleOrder.providerRut}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', gap: 4 }}>
              <View style={{ width: '25%' }}>
                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>CIUDAD</Text>
              </View>
              <View style={{ flexGrow: 1, justifyContent: 'flex-start' }}>
                <Text style={{ textTransform: 'capitalize', fontSize: 12 }}>
                  {saleOrder.providerCity}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', gap: 4 }}>
              <View style={{ width: '25%' }}>
                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>FONO</Text>
              </View>
              <View style={{ width: '25%', justifyContent: 'flex-start' }}>
                <Text style={{ textTransform: 'capitalize', fontSize: 12 }}>
                  {saleOrder.providerPhone}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', gap: 4 }}>
              <View style={{ width: '25%' }}>
                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
                  CONTACTO
                </Text>
              </View>
              <View style={{ width: '25%', justifyContent: 'flex-start' }}>
                <Text
                  style={{
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    fontSize: 12,
                  }}
                >
                  {saleOrder.providerContact}
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/* Informacion del proveedor */}

        {/* Tabla de materiales */}
        <View style={{ border: '1 solid black', marginBottom: 15 }}>
          {/* Table Header */}
          <View
            style={{
              flexDirection: 'row',
              borderBottom: '1 solid black',
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                padding: 4,
                width: '20%',
              }}
            >
              CANTIDAD
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                padding: 4,
                width: '20%',
              }}
            >
              CÓDIGO
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                padding: 4,
                width: '20%',
              }}
            >
              ARTÍCULO
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                padding: 4,
                width: '20%',
              }}
            >
              VALOR UNIT.
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                padding: 4,
                width: '20%',
              }}
            >
              TOTAL
            </Text>
          </View>
          {/* Table Body */}
          {saleOrder.materials.map((m) => (
            <View
              key={m.id}
              style={{ flexDirection: 'row', borderBottom: '1 solid black' }}
            >
              <Text
                style={{
                  fontSize: 12,
                  padding: 4,
                  width: '20%',
                }}
              >
                {m.quantity}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  padding: 4,
                  width: '20%',
                }}
              >
                {m.code}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  padding: 4,
                  width: '20%',
                }}
              >
                {m.name}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  padding: 4,
                  width: '20%',
                }}
              >
                $ {m.unitPrice}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  padding: 4,
                  width: '20%',
                }}
              >
                $ {m.quantity * m.unitPrice}
              </Text>
            </View>
          ))}
        </View>
        {/* Tabla de materiales */}

        {/* PIE DE TABLA */}
        <View
          style={{
            flexDirection: 'row',
            border: '1 solid black',
            padding: 2,
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flexDirection: 'column', padding: 5 }}>
            <View style={{ flexDirection: 'row', gap: 4 }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  textDecoration: 'underline',
                }}
              >
                SOLICITADO POR EL Sr:
              </Text>
              <Text style={{ fontSize: 12 }}>{saleOrder.requestedBy}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'column' }}>
            <View
              style={{
                flexDirection: 'row',
                gap: 6,
                border: '1 solid black',
                padding: 2,
              }}
            >
              <Text style={{ fontSize: 12 }}>TOTAL</Text>
              <Text style={{ fontSize: 12, justifyContent: 'flex-end' }}>
                $ {orderTotal}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                gap: 6,
                border: '1 solid black',
                padding: 2,
              }}
            >
              <Text style={{ fontSize: 12 }}>DESCTO.{saleOrder.discount}%</Text>
              <Text style={{ fontSize: 12, justifyContent: 'flex-end' }}>
                {orderTotal * (saleOrder.discount / 100)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                gap: 6,
                border: '1 solid black',
                padding: 2,
              }}
            >
              <Text style={{ fontSize: 12 }}>TOTAL NETO</Text>
              <Text style={{ fontSize: 12, justifyContent: 'flex-end' }}>
                $ {orderTotal - orderTotal * (saleOrder.discount / 100)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                gap: 6,
                border: '1 solid black',
                padding: 2,
              }}
            >
              <Text style={{ fontSize: 12 }}>IVA 19%</Text>
              <Text style={{ fontSize: 12, justifyContent: 'flex-end' }}>
                ${' '}
                {(orderTotal - orderTotal * (saleOrder.discount / 100)) * 0.19}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                gap: 6,
                border: '1 solid black',
                padding: 2,
              }}
            >
              <Text style={{ fontSize: 12, fontWeight: 'bold' }}>TOTAL</Text>
              <Text style={{ fontSize: 12, justifyContent: 'flex-end' }}>
                ${' '}
                {orderTotal -
                  orderTotal * (saleOrder.discount / 100) +
                  (orderTotal - orderTotal * (saleOrder.discount / 100)) * 0.19}
              </Text>
            </View>
          </View>
        </View>
        {/* PIE DE TABLA */}

        {/* Disclaimer  */}
        <View style={{ padding: 5, marginVertical: 5 }}>
          <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
            AL FACTURAR NO OLVIDE HACER REFERENCIA AL NÚMERO DE ORDEN DE COMPRA,
            PARA UNA CANCELACIÓN MAS EXPEDITA.
          </Text>
        </View>
        {/* Disclaimer  */}

        {/* Informacion sobre donde facturar */}
        <View style={{ flexDirection: 'column', gap: 5, marginVertical: 10 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                textDecoration: 'underline',
              }}
            >
              FACTURAR A :
            </Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 4 }}>
            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
              RAZÓN SOCIAL
            </Text>
            <Text style={{ fontSize: 12 }}>
              MAESTRANZA BACIAN Y ROCHA LTDA.
            </Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 4 }}>
            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>RUT</Text>
            <Text style={{ fontSize: 12 }}>79.863.750-9</Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 4 }}>
            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>DIRECCIÓN</Text>
            <Text style={{ fontSize: 12 }}>
              AV. LAS PARCELAS MANZANA D SITIO 7 ALTO HOSPICIO
            </Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 4 }}>
            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>GIRO</Text>
            <Text style={{ fontSize: 12 }}>MAESTRANZA</Text>
          </View>
        </View>
        {/* Informacion sobre donde facturar */}

        {/* Informacion sobre solicitud y aprobacion */}
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 20,
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              border: '1 solid black',
              padding: 2,
              flexDirection: 'column',
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              SOLICITADO POR
            </Text>
            <Text
              style={{
                textTransform: 'capitalize',
                fontSize: 12,
                textAlign: 'center',
              }}
            >
              {saleOrder.requestedBy}
            </Text>
          </View>
          <View
            style={{
              border: '1 solid black',
              padding: 2,
              flexDirection: 'column',
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              EMITIDO POR
            </Text>
            <Text
              style={{
                textTransform: 'capitalize',
                fontSize: 12,
                textAlign: 'center',
              }}
            >
              {saleOrder.emittedBy}
            </Text>
          </View>
          <View
            style={{
              border: '1 solid black',
              padding: 2,
              flexDirection: 'column',
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              AUTORIZADO POR
            </Text>
            <Text
              style={{
                textTransform: 'capitalize',
                fontSize: 12,
                textAlign: 'center',
              }}
            >
              {saleOrder.approvedBy}
            </Text>
          </View>
        </View>
        {/* Informacion sobre solicitud y aprobacion */}

        {/* Email de contactos */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 5,
          }}
        >
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
              Bacianproduccion@gmail.com
            </Text>
            <Text style={{ fontSize: 12 }}>57/ 254 2883</Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
              mbacian@bacianyrocha.cl
            </Text>
            <Text style={{ fontSize: 12 }}>57/ 542883</Text>
          </View>
        </View>
        {/* Email de contactos */}

        {/* Pie de documento con sello */}
        <View
          style={{
            flexDirection: 'row',
            marginTop: 40,
            alignItems: 'center',
          }}
        >
          <View
            style={{ height: 4, width: '100%', backgroundColor: 'yellow' }}
          ></View>

          <Image
            src={qualitySeal.src}
            style={{
              alignSelf: 'flex-end',
              bottom: -1,
              height: 100,
              width: 100,
            }}
          />
        </View>
      </Page>
    </Document>
  );
};

export default SaleOrderPDF;
