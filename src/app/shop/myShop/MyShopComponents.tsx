import { headers } from 'next/headers';
import MyShop from './MyShop';

export default async function MyShopComponents() {
  const headersList = await headers();

  const someHeader = headersList.get('x-custom-header') || '';

  return <MyShop serverHeader={someHeader} />;
}