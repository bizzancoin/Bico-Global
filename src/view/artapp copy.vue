<template>
    <div class="artapp_div">
        <!-- 币种行情 -->
        <div>
            <!-- <div class="container">
                <div class="betweenSpread market_title">
                    <div class="leftSpread">
                        <el-tabs v-model="activeName" @tab-click="handleClick">
                            <el-tab-pane :label="$t('home.mark')" name="1"></el-tab-pane> 
                            <el-tab-pane :label="$t('home.coinMark')" name="0"></el-tab-pane>
                        </el-tabs>
                    </div>
                    <el-button @click="checkPair">{{$t('home.checkPair')}}</el-button>
                </div>
            </div> -->
            <Trade :activeName="activeName" />
        </div>
        <div class="baAX0PF9AVpM03C30LDa cc_cursor">
            <div class="AwsLHsacI5OhANTDV6ng cc_cursor">
                <div>
                    <h3>
                        <span></span>
                        <span class="FwHELYUlEt4CzFUy1fvm">
                            <br></span>
                    </h3>
                    <p></p>
                </div>
            </div>
            <div class="AwsLHsacI5OhANTDV6ng cc_cursor">
                <img src="../assets/logo_txt2.png">
                <div>
                    <h3>
                        <span>{{$t('home.huobi16')}}</span>
                    </h3>
                    <p>{{$t('home.huobi17')}}</p>
                </div>
            </div>
            <div class="EmuSQjkiZVeLkTJeuL5s cc_cursor">
                <div class="Cxes8pdRHI7ruiAetwwE cc_cursor"></div>
                <div class="PNiUYpJKQhmwdy_zgnIp cc_cursor"></div>
            </div>
            <div class="Fq5s6j9G6EvY5cj8RSmb cc_cursor">
                <div class="tIt8JSp9mhKKx6DNIMoE">
                    <div class="wHAHYYZIuJFFId7OlVRo cc_cursor">
                    </div>
                </div>
            </div>
        </div>

        <div class="En6iy4u3qPOdT8KDHrOc">
            <div>
                <div class="VNE7aXARdJZrZssT40Fd cc_cursor">
                    <div class="d7J1PEEIJ6V3FZt441oB cc_cursor">
                        <div class="downloadBox">

                        <div class="container_app">
                       
                            <div class="leftSpread verticalBox">
                            
                                <div class="leftSpread vertical">
                                    
                                    <div class="downImg">
                                        <div id="androidDown"></div>
                                        <div class="sFbzcQ2_Xq9R9QcyFoPE">
                                            <p>Android</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="leftSpread vertical">
                                    
                                    <div class="downImg">
                                        <div id="iosDown"></div>
                                        <div class="sFbzcQ2_Xq9R9QcyFoPE">
                                            <p>App Store</p>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="isToken == undefined" class="leftSpread vertical">
                                    
                                </div>
                            </div>
                        </div>

                    </div>

                    </div>
                    <div class="S3U0HCSczyF8K3yF7OOD">
                        <a class="cble46zAo5eUI6RlpKvf" href="/" target="_blank" rel="noopener noreferrer">
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAADnklEQVRoQ+2aTahVVRTHf3+yBikWaioqWpiKhN8N/GiQFkEEkSTSICoHhqIDEUcqouLHQEoMNBxIOjAHoiSERKGlojWoVAwRFfOjoLB0EKJQuGLJFvRx3zt777vPvTx5C+7orPXf63fWOfusvfcVj5jpEeOhB6hURc1sBvA+8CqwXtKOEtotr5CZPQNsA+Y8ALBE0pZuB2Rmk4BvgP4dkn9L0oFuBWRmQ4HLQK8OiRswQNKN7gZ0GhjfIOkvJM0uAeMaLXmHzOwdYE8nSY+T9Et3A/KEX2iQ9GZJS0vBtKRCZvYs8GuDpA9KeqMkTKuAPOkvOyS+TdKi0jCtAnoT8Cn5H+BrYKukb+uAaRVQX2AUcEnSzbpA7us2NcuZ2RBgAjAIuANcBH6S5N+WSjOzscBooB9wGzgv6efKwC4csoDMzN+LhcBrwOMd9K+ER2ufdwWS7j543cz8Bvg07hrjGuR2Hvgc+FiSP6ZJlgRkZn2AncDbkaNc9YoB14AngcnhFxP+J7BIkt+YaIsGMrPhwFFgRLR6GccVkjbESkUBhcpcArxTboctl7QxZuBYoOPA9BjBGnxOACtjp/pKIDN7D9hVQ6Ixkvslxb6v9/RigP4I03JMAiV9zkhq1J13OUaXQGY2CzhUMssErVGS/LuWZFVAm4BlSYplnL+S9HqOVBXQYWBmjnCTMXMl7c3RqALyqfq5HOEmY0ZLupCjUQXkzeTTOcJNxPwLDJH0V45GFdCt0LLkaOfG/BeArucIVAG1o0LOMVbSuTqA2vUOvStpdx1Ax4CXcoSbjDks6ZUcjapHbjvwYY5wgZgxknxtlGRVQAuAT5MUyzmfljQxVa4KyJfIZ1NFC/rvkvRBil5Mc+ofuOdTRAv77gfmx+59xwCtA1YUTjJV7m/gE0lrqwJjgLz18em73ebbYCOrkqgEcgEz8yWELyXaaS9K8g2XLi0WaArwY5VYjde/kxTV9UcBhSq1aynhw0d33ylAvo3lm4itto8kRS8yo4FClVYBa1pI9LukYSnjJQEFqFNhPztlnFzfiZL8KDPacoB8s/E34InoUfIcF0vamhqaDBSqNBX4PnWwBP/so8osoAA1DfC2ZHAniZ4JB10nAV9OPxb2xV8Of7ro3UncGkmrE+Afcs0GClBPhbbIT+kczI8/fgA+k3Sws6TMbCAwL4D519/3ETzOj1CO5MJ4XFNAzQxcV2wPUF13tpRuT4VK3cm6dP4Hj8AHRAPX6j8AAAAASUVORK5CYII=">
                            <span>App Store</span>
                        </a>
                        <a class="cble46zAo5eUI6RlpKvf" href="/" target="_blank" rel="noopener noreferrer">
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAEtUlEQVRoQ+2ZecilcxTHP8cWCkW2UFKUktIkkj9I+Mu+RfYsCfGHJSSDP4SQfRnrGI11MvbGVih7SDPGbsg+C2OGMZarj86t27jv+9znPs9z7zW9v3r/ep/3fc7nnnO+53t+N1jJTqxkPEwAjXpGJzL0v89Qq9U6DJgLbA9MAl4AXgN+jIjWqAEWllyr1RLmXeBs4ADgVOB+4BHgI+D3UQLrBWgxsA7wIHAasB9wgxkCrgaeBT4Glo8CWC9A3wMbZWmZlZOAPYFbgfWAt4E7gOeBLyJi+TDLsCyQsT4KHAfsBtwMbAL8BbwI3JNg8yPij2GA9QNknE8ARwM7Z6a2yOCFeCx77DlgSUT8OUiwfoGM8RngSGAH4C5g847Af0poxeOVBDOLjZ8qQAanhB8BbJdQ7Uy1A/86wS3F9yJCgWn0VAUyODPgrNoGmAZs1iXiz4HHszznRcTSpqjqADK2N4BDgS2B+8aA8rkPgenA7cCCiFhWN1hdQMbl8D0E2DShViy/dux/A7NT6u2xRXVKfZ1ABvw+cDCwcQGUz6p+b6b0PwUsrkPq6wYyUK2SUA7de4GteigrZ9iNSn5VqCaAjF8rdCCwZmZKwSg672TJanh/Bhb2Y6WaAmpDmalVEmpb6Loh21PapxPTYl2ebv5uYA6wtAxYk0BCKdf7Z7+ofq4gAnYKxOvAMamMKqBWyrOwXYYpIst6AWsayMDmAfu6ZqTX2zGhdA7uVUdlnwmz4RgzTM+oq59bJPWDADLGL3OX+iWhtEttGEtRmA0KmsyyvBOYla6+q0ccFJCxaoN0FLqEY7Octk4lXL9IMTp+r+m9LiJ0Hv85gwTy5YuAXSNiTqvVsvTcoVweyx7tk65kqECWyMu59brt6iSuB3YCVi1BtAR4OiK0WkMDck96Ejge2Bs4E7gMcPa47e7eA9SvqZpT7aWImD8sIGHccl3d9wKmAOtm+alwekCh9gBW6xKkBnZBism0iPhgvGw23UPCzMihuU+67LU6ArJ8XBJVsNvyrqIN5d8K4oehbM+OiMIlsUkgL0sM5oS0QQa8RpdPt616yrgXL95V/AaoZtcCb5Xxd00BCfMwcApwOHBLQdP7vOBuwKcrHhFhz5U+TQAZ3EN5IWk5eYdXdMzSv/tURHxb9PAge0h78wBwRg7PawqCE+TTHK4ql/6t0qkzQ6qR+89ZwMnAFeNE5rOuGDOBm6pmpfM9dQHZxPqsc7MHnDHdjiCfpR+bomOolI6GBqsDT3U6P7NzaZf32Fff5JXW1Ih4tW6Q9v+rmiF7wKa/CDgHuGSFQJ0lbp865OkR4Y1ro6cKkEPRpr8YuDCh2sHq21wVlGEVb0aZWVKFuF8gYVyV/TE7F2QQ3gd4O+qQ9IrKS4/KylUGsB8gP3mb/ipgMnBevlBIfZbmcWZEfFUmkLqeLQskjE2vJVGWnTcqnN8haTDtE+fK0E4vQD/krm8pCaONEUZb41S3tJTgcV3woAh7AXLvWD2b369Nrkx/potWFPxWodAFjxKQkutVrddQNr9XUZMj4qVBBVnmPb1kaBfgE+AgYO30at8N+pu5XqEKgXr9R6Py3ATQqGRirDgmMjSRoQF/Av8Ah+25RFUW1qAAAAAASUVORK5CYII=">
                            <span>Google Play</span>
                        </a>
                        <a class="cble46zAo5eUI6RlpKvf" href="/" target="_blank" rel="noopener noreferrer">
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAADRElEQVRoQ+2YW6hNURSGv/8BKURJLqHIi4RIHEUuSXggHhQiub25RHFCIbc8iOOFeFDyQEpSSCIkEiJ5kQe3JEkuh6IYGlpH+xx77zXnOvZms2adOrXG/Mf45j/XnnMs8Y8N/WM85EB/u6O5Q7lDVV6BfMtVecGj0/2/DplZW+A5cFrSouilyzDBzDYDc4Fhkt6HSAQ7lAB9TkS7SHobkiBrTIt8nSW9C9EKBnIxM1sKHAAOSvL/KzbMbCewFtgkyZ0KGlFACdQHoIP/SfoYlCUyyMzaAF+Ab0BbSV9DJbIANbnUIGlFaKKYODPbAawD6iW5U8EjGijUJTPrD/QFugEdk4oagVfAE0mPilVpZu2BT+6QpHbBJElgVqBlwH5gn6TlCWQvYDowDhgO9Esp5jFwC7gMnJL0LNHZA7jzKyXtrQpQkvgp0BuYBUwB5vt+jy0gifd35AhwFjjmx4Mk144emRxKgNYDW6Mzhk2I+mUrlMwEZGZrgNVA97D6oqP8PfMfnW2xM6OAkhf2BDA1NlHG+Au+pUNvCZ4jGMjM3I0rwICMxWWd9gQYK8nf2dQRBJTA3AZ6pipWJuC1/3KGQKUCmZmfBQ+BPpWpNVj1pe8OSX6WlRwhQJeSsyU4cwUDb0iqywxkZvXA9goWmEV6q6SNpSaWdCi5uhS9nmSp4jfPGSTpQTHNckA3gRFlCjnuzR4wAVj4mwo+CpwDJgPzymjelzQ4GMjMxgMXywjelDSy6bmZnQcmtRLqqqSxBZp+RIwpozlN0pmWz4s6ZGbXgVFlxDYUnuJmttibvlYCrZDUUAC0CthdRvOepKGpQGY2ECi6Pwsmn5PkF9Ifw8x8q8xpJdBJSTMLNE8CM1I0/Wy6Uxjzi0Nm5lf2Hy1Bytji135gIrArLTjw+Ybkxu2LFXLxPSRpSRrQC6BHYAF/OuwN0FWSNRXSzCEzGwLc/dNVRuavk3SjFJB3it4x1tJo9t2hpUOHgQW1RAMclzS7lEPXgNE1BnRL0s8LQEuH/OtkpxoDapTU9FWpeYNnZt5Eda4xoLeSfrY2qe1DjcGFt+C1ApY79Lc7lTuUO1TlFci3XJUXPDpd7lD0klV5Qu5QlRc8Ot13p9r0NTntxTMAAAAASUVORK5CYII=">
                            <span>Android</span>
                        </a>
                        <a class="cble46zAo5eUI6RlpKvf" href="/" target="_blank" rel="noopener noreferrer">
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyVpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTQ0NUIyODZFNjBGMTFFQjhFQ0NCQUNBNTU4RDgxNDQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzJFNkMyMDRFNjEwMTFFQjhFQ0NCQUNBNTU4RDgxNDQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFNDQ1QjI4NEU2MEYxMUVCOEVDQ0JBQ0E1NThEODE0NCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFNDQ1QjI4NUU2MEYxMUVCOEVDQ0JBQ0E1NThEODE0NCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pl48WicAAAINSURBVHja7Jo9SwMxGMfTgu+4SEdBsIuLcx18AQcHHdqioN9BP4ZuOru4O6koLiJO4iAOLioUwUpfjg4qOGhbCz3/oRlKONpcLu091jzwo+SaJ8n/nrzcJRdxXZf1kkVZj5kVZAVZQTQFzYFj8A7cJj7AGVjpmCI+bRtkDJy6anYOYobrZxGD69A4uARTPnyewSIomGqEKUGj4AZMa/hmQAJ8UhJ0CDY8rmfBifidAGkQ98h3BNaojKGkx/iogk0QlfLy9Jb4X7YlE2MoaAE8wo9Sw+og1cYvJfI125PHDei6oFmPO32g6Lvv4bscVFDQdWhd7sFgW9F3B9Sla8mwF9YZKf0AXhV9+VR9L11LhC1oUkrnfPq/SOl4J6ftLzBM8HHtG4zoRKhI9PmzoNvlqAoq6gpyiApyei1Cjo2QyuD7i5OCYycFAl2u1cLaDyo8DyExvLGD4EcnQtypRCw6pVZiVJ7lcsQEtW3PvxOUtxHqrOVtl7OCiAlS2Wjkb4hDBMRUVNoRNTEQqURHVVDOCiIuKEtEUNaUoFsigu5UMqnMcgPiLTEWopg31jhQq5qIEC9kN+To7KmIUY0Qtz5wzQzsPWsY7/L8ELpmagwxUdgqaxwfdtMyot6aqoOfzXq+ObEALrokhtczz/zuD2qe2qXBFSi7Zq0syk2LekI91idh9tMYK8gKCma/AgwA4HzCkU/hY4YAAAAASUVORK5CYII=">
                            <span>Galaxy Store</span>
                        </a>
                        <a class="cble46zAo5eUI6RlpKvf" href="/" target="_blank" rel="noopener noreferrer">
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAACO0lEQVRoQ+2Zu4oWQRCFv7NeUPACXldFxdt6jXwRIwMxVB9CEzMFn0E3EYzEwNjY0GgzY59ADBZljxT0D6P8u1Mztr/Dbw9MMFAzXeecqunqKrFkl5YMDw3Q1BVtCjWFFsxAC7m/Sbjts8AacBI4ApwHbgOrkm5m1l64QrZXgavhJHAMOAPcAi4D12D+ViIp5WvKKMNM18b23vJ8Bzhe7mD4RlFgz8BvfpV0KPPOaEC2Y4Hrhd2LJUzC+WD5MfAe+J5xImFTB5DtfUAwG45HbEeYnABOF8cPbuPMfUlvbDvhbMakGqCNAiizaNfmrqS3tn8Au4a+PMe+GqBNYJYPQ/yaLKAvJbyGgAnbBqiHsWoh1xQqTLeQayG3DQM7Vgq2Ww61HMrtcNV+22NrsYeSXlWs5ahyfLD9BIiqOgsscjLu15I2bD8DVga8P0+v+N6mpKcZMUcfHzIf/xc2fX+59XKq3BrgXFTXzyV9tP2uVNtZhectEwp/k3Qv40MfoLGOPJC0PsUcavtQ24cyiQHV9qEWci3kWsjtzEDfPtRyaOo5NLZSmGxP4UVpAc/GHAdyOTzRvlzXeduHy/QgJgjRnI8+dzTnLwCXgP0d+0eSXlas5epsrEk1sH20NPQDZMx7PgCfgU8jxye/L71YQPOA216RtGX7VGcqF5OL2YDrSlF2d4a4KifWzEJ/YlPAxqgmlA2Vz5V5U4xuIpxnVygURPRe/9eJtZeOCRo0hSYoyi8uNYWaQgtmYOlC7iccuEJE96Z4twAAAABJRU5ErkJggg==">
                            <span>Windows</span>
                        </a>
                        <a class="cble46zAo5eUI6RlpKvf" href="/" target="_blank" rel="noopener noreferrer"> 
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAEpElEQVRoQ+2ZV6heRRSFv2XF8iDoi1hiQ32wF4woiA0VxILmRoyCDdQYBfXF2EAFzYuCNYmIoNiTgIhdsD5YoqhYUNEH25NGEVQwli0L5sLPf/9zzsyc/3pDvPN6ZvaeNXufNWvvEevZ0HqGh1lA63pEZyP0v4pQRGwAHAwcCRwE7A5sB2yRDuI34HvgC+Bd4BVgtaR/xnVQY0m5iNgeuARYAOxQuLlvgYeBuyV9V7h2yvRegCJia+BG4AJgk56bWQvcB1wvaU2trWpAETHhUwW2qXXesO5HYJGkx2vsFgOKiI2AO4GLahwWrFkGXCrpr4I1ZRdrRGwO+OROLHHSY+7TwHxJv+fayI5Qiswq4KRc42Oa9xRwWm6kSgA5BS4c0yZLzSyXlJXiWYAiYj7wWMMufgD2AXYGXgf8j5WOX4EDgQ3T/eTUHh5nSnq0y3AnoETNn3Ww2QvACcB1wA1dTkd8Px94CHgb2K9h/U/AnpJ8gI0jB9DSTEa7ArgDeBU4vADUSknzIuJWwDbaRmfqtQKKiB2BL4GNMzb4B3AI8AvwPrBVxhqrhH2TXHoeOln3T2A3Sd802e4CdAtwVcbGJqd8mjTcqUnOtC39GzgG+AT4ENg2088SSYuLASWh+TVgnVYylkpaGBEPAme3LFwCXA08WXgVWO/NaRK0jRGKCKfPWyVI0twATgZeS6m3ywgbq4HDkga8p8LHXEkmkCmjDZDDenOFMy9po3JT9AHpvzSwURTd5XaxJEe4CNBK39Bdllu+vwgcP4LKTdEuFxz9JorucrtK0umlgD4C9uqy3PF9mMpLKLrN9MeS9i4FZBnveqfPGKRya7IjCii6ze8aSSPLlrZ/yJvpW7R5U6Zyl+Umiy0LKboJ1FpJm5ZGaFyA7PccSQ9ExLXATX1CntZWARpHytn/JEW7UeJmiFXEKCovwVmVcuMgBVP0/il1nwUOBXbqoconQVeRQl/atvPzgEcGKLqJykui47lVtN3nYrXTFZImRqjoK4HbK1T5IOiqi3Uu8Gbp0aX5bSraZGPbPwMfZKry4W1USR93QWvEqVX00Ymum1T0JJVb8zklS0adOLWHiCgtH7zMa67JUNG5qnwYbF35kAC5dPiq4IJ9J1Wr7qR2qWhftKek/rZTL4fK3V3dta1lnFOCuzu6MCMnBinajfjNMtb4rnODZQ7wRkaDZZmki9vs5gCynvs8Q9edC7gr4zrFZXXueAk4DrCKcJ+8abjfvUdX37sTUEq9M9Jmm5w9IWl+RNwGXJ6LZGBeDpUvkNRJIFmAEqimRqPp99j0D7hNnG1zAJD/DbfB/F89BwwLz3slZTU5s51HhJX3isL6vyJYU5a47JgnyaA7RzagFCWXy5ZEPs3/YjwDTExLs35y9xHhHp2fU7JSoAfq5ek5xb247FEUoUGrEWGiMLDpePC6LKePPQplNaCUggbjgs2qum9163/kfjdVJPl+qhq9AA2koRXFIuCs9Opdshm/irtRf9eMPxoP73rgWf+o9DziZ32DdS/Bw2rC4tLP+u8BL6+Tz/ol4ZjuuWNJueneZIn9WUAlpzUTc2cjNBOnXuLzXxpvY0QgEQKzAAAAAElFTkSuQmCC">
                            <span>Mac OS</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <Foot/>
    </div>
</template>
<script>
import QRCode from 'qrcodejs2'
import Trade from '@/components/trade'
import Foot from '@/components/Foot'
import { partenApi,bannerApi } from '@/api/getData'

export default {
    data(){
        return{
            bannerArr:[],//banner图
            isToken:sessionStorage.getItem('userToken'),
            lang:sessionStorage.getItem('language'),
            activeName:'1'
        }
    },
    created(){
        
    },
    mounted(){
        this.bannerFun();
        this.qrcodeFun()
    },
    methods:{
        handleClick(){

        },
        async qrcodeFun(){//获取下载app的地址
            var that = this;
            // appDown(function(res){
                new QRCode('androidDown', {
                    width: 100,  
                    height: 100,
                    text:'https://app.mobile.bico-global.com/download.html'
                })

                new QRCode('iosDown', {
                    width: 100,  
                    height: 100,
                    text:'https://app.mobile.bico-global.com/download.html'
                })
            // });
        },
        async bannerFun(){//banner图
            var that = this;
            var data = new URLSearchParams();
            data.set('showType','PC');
            var res = await bannerApi(data);
            that.bannerArr = [];
            if(res.code == 200){
                that.bannerArr = res.data;
            }
        },
        checkPair(){
            if(this.activeName == '1'){
                this.$router.push('/transaction')
            }else{
                this.$router.push('/legalTrastion')
            }
        },
        jumpRegister(){
            this.$router.push('/register')
        }
    },
    components:{
        Trade,Foot
    }
}
</script>
<style lang="less">
.artapp_div{
    //轮播图
    .block{
        a{
            display: inline-block;
            width: 100%;
            height: 100%;
            .imgFull{
                object-fit: cover;
            }
        }
        
        
    }
    .market{
        .container{
            h2{
                
                margin-right: 30px;
                font-weight: inherit;
            }
            .market_title{
                margin: 50px 0 20px 0;
                .el-tabs__header{
                    margin: 0;
                }
                .el-tabs__item{
                    font-size: 24px;
                    color: #8E8E8E!important;
                }
                .el-tabs__item.is-active{
                    font-size: 28px;
                    color: #333333!important;
                }
                .el-button--default{
                    background-color: transparent;
                    border: 1px solid @mainsColor;
                    span{
                        color: @mainsColor;
                    }
                }
            }
        }
    }
    .article {
        h2{
            margin: 40px 0;
            font-size: 28px;
            font-weight: inherit;
            text-align: center;
        }
        .article_box {
            ul{
                display: flex;
                flex-direction: row;
                li{
                    width: 33%;
                    margin-right: 28px;
                    text-align: center;
                    padding:0 22px;
                    &:nth-last-child(1){
                        margin: 0;
                    }
                    p{
                        font-size: 18px;
                        line-height: 40px;
                        border-bottom: 1px solid #3C3C3C;
                    }
                    span{
                        font-size: 12px;
                        color: #8E8E8E;
                    }
                    img{
                        width: 260px;
                    }
                }
            }
        }
    }
    .downloadBox{
            padding: 0px 0px;
            background-color: #ffffff00;
            margin: 0px 0;
        h2{
            text-shadow:0px 2px 3px rgba(170, 170, 170, .3);
            font-size: 28px;
            text-align: center;
        }
        .vertical{
            margin: 0px 0  0 0px;
            .downImg{
                    background-color: #ffffff;
                    padding: 12px;
                    margin-left: 50px;
                    width: 136px;
                    height: 136px;
                    border-radius: 7px;
                    border: 1px solid #ccc;
                    transition:all 1s ease-out;
                    -webkit-transition: all 1s ease-out;
                    -moz-transition: all 1s ease-out;
                    -o-transition:all 1s ease-out;
                &:hover{
                    transform:scale(1.5);
                    -webkit-transform: scale(1.5);
                    -moz-transform:scale(1.5);
                    -o-transform:scale(1.5)
                }
            }
        }
        .verticalBox{
            width: 600px;
            margin: 0 auto;
        }
    }
    .partner{
        h2{
            margin: 40px 0;
            font-size: 28px;
            font-weight: inherit;
        }
        ul{
            display: flex;
            display: -webkit-flex;
            justify-content: space-between;
            flex-direction: row;
            flex-wrap: wrap;
        }
        li{
            width: 33%;
            margin-bottom: 40px;
            a{
                width: 320px;
                text-align: center;
                display: inline-block;
                cursor: pointer;
                img{
                    border-radius: 2px;
                    height: 120px;
                }
                p{
                    color: #ffffff;
                }
            }
        }
    }
    
    .AwsLHsacI5OhANTDV6ng {
        margin-top: 0px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .AwsLHsacI5OhANTDV6ng img {
        flex-shrink: 0;
        width: 150px;
        height: 150px;
        margin-right: 20px;
    }
   
    .baAX0PF9AVpM03C30LDa h3, .baAX0PF9AVpM03C30LDa p {
        margin: 0;
    }

    .AwsLHsacI5OhANTDV6ng .FwHELYUlEt4CzFUy1fvm {
        margin-left: 10px;
        color: #00f2e6;
        font-size: 16px;
        display: inline-block;
        line-height: 22px;
    }
    .EmuSQjkiZVeLkTJeuL5s {
        margin-top: 85px;
        display: flex;
        justify-content: center;
    }
    .Fq5s6j9G6EvY5cj8RSmb {
        margin-top: 70px;
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .EmuSQjkiZVeLkTJeuL5s .Cxes8pdRHI7ruiAetwwE, .EmuSQjkiZVeLkTJeuL5s .PNiUYpJKQhmwdy_zgnIp {
        width: 590px;
        height: 354px;
    }
 
    .Fq5s6j9G6EvY5cj8RSmb .Cq1YqusRLKYrWQJiKwQ0 .v9SxiJwyPbov5gEgQR5X {
        background: rgba(89,63,124,.4);
        margin-bottom: 14px;
        border-radius: 10px;
        border: 1px solid rgba(255,255,255,.4);
        width: 100%;
        height: 45px;
        display: flex;
        align-items: center;
    }
    .Fq5s6j9G6EvY5cj8RSmb .Cq1YqusRLKYrWQJiKwQ0 {
        width: 175px;
    }
    .Fq5s6j9G6EvY5cj8RSmb .tIt8JSp9mhKKx6DNIMoE {
        margin-right: 480px;
        text-align: center;
    }
    .Fq5s6j9G6EvY5cj8RSmb .wHAHYYZIuJFFId7OlVRo {
        display: flex;
        position: relative;
        height: auto;
        width: auto;
        margin-bottom: 40px;
    }
    .Fq5s6j9G6EvY5cj8RSmb .wHAHYYZIuJFFId7OlVRo .sFbzcQ2_Xq9R9QcyFoPE {
        width: auto;
        text-align: center;
        margin-right: 39px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .Fq5s6j9G6EvY5cj8RSmb .wHAHYYZIuJFFId7OlVRo .sFbzcQ2_Xq9R9QcyFoPE .jGWMomzT6X882Rp_uuZX {
        padding: 4px;
        width: 136px;
        height: 136px;
        background-color: #fff;
        border-radius: 7px;
        border: 1px solid #ccc;
    }
    .Fq5s6j9G6EvY5cj8RSmb .wHAHYYZIuJFFId7OlVRo .sFbzcQ2_Xq9R9QcyFoPE p {
        margin: 10px 0 0;
        font-size: 14px;
        color: #fff;
    }
    .Fq5s6j9G6EvY5cj8RSmb .wHAHYYZIuJFFId7OlVRo .sFbzcQ2_Xq9R9QcyFoPE .bYnECsZBchyuvGkpyJ9Y {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .Fq5s6j9G6EvY5cj8RSmb .MtwoBORcDhyzVKArt9Nk {
        color: #00f2e6;
        font-size: 15px;
        border-bottom: 1px solid #00f2e6;
    }
    a {
        color: #00d0c4;
        text-decoration: none;
        background-color: transparent;
        outline: none;
        cursor: pointer;
        transition: color .3s;
        -webkit-text-decoration-skip: objects;
    }
    .Fq5s6j9G6EvY5cj8RSmb .Cq1YqusRLKYrWQJiKwQ0 .v9SxiJwyPbov5gEgQR5X img {
        width: 25px;
        height: 25px;
        margin-right: 13px;
        margin-left: 17px;
    }
    img {
        vertical-align: middle;
        border-style: none;
    }
    .Fq5s6j9G6EvY5cj8RSmb .Cq1YqusRLKYrWQJiKwQ0 .v9SxiJwyPbov5gEgQR5X span {
        font-size: 16px;
        color: #fff;
    }
    
    .VNE7aXARdJZrZssT40Fd {
        display: flex;
        position: relative;
        height: auto;
        width: auto;
    }
    .VNE7aXARdJZrZssT40Fd .d7J1PEEIJ6V3FZt441oB {
        width: auto;
        text-align: center;
        margin-right: 39px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .VNE7aXARdJZrZssT40Fd .d7J1PEEIJ6V3FZt441oB .EQ0eFZN7VCdVZTfRBgi4 {
        padding: 4px;
        width: 136px;
        height: 136px;
        background-color: #fff;
        border-radius: 7px;
        border: 1px solid #ccc;
    }
    .VNE7aXARdJZrZssT40Fd .d7J1PEEIJ6V3FZt441oB {
        width: auto;
        text-align: center;
        margin-right: 39px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .S3U0HCSczyF8K3yF7OOD {
        display: flex;
        flex-wrap: wrap;
        width: 420px;
    }
    .S3U0HCSczyF8K3yF7OOD .cble46zAo5eUI6RlpKvf:nth-child(2n-1) {
        margin-right: 63px;
    }
    .S3U0HCSczyF8K3yF7OOD .cble46zAo5eUI6RlpKvf {
        background: rgba(89,63,124,.4);
        width: 175px;
        height: 45px;
        margin-bottom: 14px;
        border-radius: 10px;
        border: 1px solid rgba(255,255,255,.4);
        display: flex;
        align-items: center;
    }
    .S3U0HCSczyF8K3yF7OOD .cble46zAo5eUI6RlpKvf img {
        width: 25px;
        height: 25px;
        margin-right: 13px;
        margin-left: 17px;
    }
    .S3U0HCSczyF8K3yF7OOD .cble46zAo5eUI6RlpKvf span {
        font-size: 16px;
        color: #fff;
    }
    .container_app {
        width: 100%;
    }
    img {
        vertical-align: middle;
        border-style: none;
        width: 136px;
        height: 136px;
    }
    
    
  
}
</style>