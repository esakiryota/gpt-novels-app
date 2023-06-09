import Box from '@mui/material/Box';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TopBar from '../../components/topBar';
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "../../lib/ironSession/config";
import { auth } from '../../lib/firebase/config'

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req }) {
      const user = req.session.user;
      if (!user) {
        const authCheck = false;
        return {
            props: {
                auth: authCheck
            }
        }
      } else {
        const authCheck = true;
        return {
            props: {
                user: user,
                auth: authCheck
            }
        }
      }
    },
    ironOptions
  );

function Terms() {
    const homeUrl = process.env.PUBLIC_URL;
    return (
        <Box>
        <Box>
            <TopBar name="利用規約" />
        </Box>
        <Box  sx={{margin: 5}}>
            <Box style={{fontSize: 18}}>この利用規約（以下，「本規約」といいます。）は，開発者がこのウェブサイト上で提供するサービス（以下，「本サービス」といいます。）の利用条件を定めるものです。登録ユーザーの皆さま（以下，「ユーザー」といいます。）には，本規約に従って，本サービスをご利用いただきます
</Box>
            <Box style={{fontWeight: 'bold', fontSize: 24 , marginTop: 10}}>第1条（適用）</Box>
            <Box style={{fontSize: 18, marginTop: 5}}>
                <ol>
                   <li>本規約は，ユーザーと当社との間の本サービスの利用に関わる一切の関係に適用されるものとします。</li>
                </ol>
            </Box>
            <Box style={{fontWeight: 'bold', fontSize: 24,  marginTop: 10}}>第2条（ユーザーIDおよびパスワードの管理）</Box>
            <Box style={{fontSize: 18,  marginTop: 5}}>
                <ol>
                   <li>ユーザーは、自己の責任において、本サービスのユーザーIDおよびパスワードを適切に管理するものとします。</li>
                   <li>ユーザーは、いかなる場合にも、ユーザーIDおよびパスワードを第三者に譲渡または貸与し、もしくは第三者と共用することはできません。当社は、ユーザーIDとパスワードの組み合わせが登録情報と一致してログインされた場合には、
                    そのユーザーIDを登録しているユーザー自身による利用とみなします。</li>
                   <li>ユーザーID及びパスワードが第三者によって使用されたことによって生じた損害は、開発者に故意又は重大な過失がある場合を除き、開発者は一切の責任を負わないものとします。</li>
                </ol>
            </Box>
            <Box style={{fontWeight: 'bold', fontSize: 24,  marginTop: 10}}>第3条（禁止事項）</Box>
            <Box style={{fontSize: 18,  marginTop: 5}}>
            ユーザーは，本サービスの利用にあたり，以下の行為をしてはなりません。
                <ol>
                   <li>法令または公序良俗に違反する行為</li>
                   <li>犯罪行為に関連する行為</li>
                   <li>当社，ほかのユーザー，またはその他第三者のサーバーまたはネットワークの機能を破壊したり，妨害したりする行為</li>
                   <li>本サービスによって得られた情報を商業的に利用する行為</li>
                   <li>本サービスの運営を妨害するおそれのある行為</li>
                   <li>不正アクセスをし，またはこれを試みる行為</li>
                   <li>他のユーザーに関する個人情報等を収集または蓄積する行為</li>
                   <li>不正な目的を持って本サービスを利用する行為</li>
                   <li>本サービスの他のユーザーまたはその他の第三者に不利益，損害，不快感を与える行為</li>
                   <li>他のユーザーに成りすます行為</li>
                   <li>開発者が許諾しない本サービス上での宣伝，広告，勧誘，または営業行為</li>
                   <li>面識のない異性との出会いを目的とした行為</li>
                   <li>本サービスに関連して，反社会的勢力に対して直接または間接に利益を供与する行為</li>
                   <li>その他，当社が不適切と判断する行為</li>
                </ol>
            </Box>
            <Box style={{fontWeight: 'bold', fontSize: 24,  marginTop: 10}}>第4条（本サービスの提供の停止等）</Box>
            <Box style={{fontSize: 18,  marginTop: 5}}>
                <ol>
                   <li>当社は，以下のいずれかの事由があると判断した場合，ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
                    <ol>
                        <li>本サービスにかかるコンピュータシステムの保守点検または更新を行う場合</li>
                        <li>地震，落雷，火災，停電または天災などの不可抗力により，本サービスの提供が困難となった場合</li>
                        <li>コンピュータまたは通信回線等が事故により停止した場合</li>
                        <li>その他，開発者が本サービスの提供が困難と判断した場合</li>
                    </ol>
                   </li>
                   <li>開発者は，本サービスの提供の停止または中断により，ユーザーまたは第三者が被ったいかなる不利益または損害についても，一切の責任を負わないものとします。</li>
                   <li>ユーザーID及びパスワードが第三者によって使用されたことによって生じた損害は、開発者に故意又は重大な過失がある場合を除き、開発者は一切の責任を負わないものとします。</li>
                   <li></li>
                   <li></li>
                </ol>
            </Box>
            <Box style={{fontWeight: 'bold', fontSize: 24 , marginTop: 10}}>第5条（利用制限および登録抹消）</Box>
            <Box style={{fontSize: 18, marginTop: 5}}>
                <ol>
                   <li>当社は，ユーザーが以下のいずれかに該当する場合には，事前の通知なく，ユーザーに対して，本サービスの全部もしくは一部の利用を制限し，またはユーザーとしての登録を抹消することができるものとします。
                    <ol>
                        <li>本規約のいずれかの条項に違反した場合</li>
                        <li>その他，開発者が本サービスの利用を適当でないと判断した場合</li>
                    </ol>
                   </li>
                   <li>開発者は，本条に基づき当社が行った行為によりユーザーに生じた損害について，一切の責任を負いません。</li>
                </ol>
            </Box>
        </Box>
     </Box>
    )
}

export default Terms;